/* ============================================================
   طبقة البيانات — وضعان:
   1) Supabase  : عند تعبئة CONFIG.supabase (قاعدة بيانات حقيقية)
   2) local     : تخزين داخل المتصفح (localStorage) — تجريبي، ويعمل فوراً
   ============================================================ */

(() => {
  "use strict";
  const LS = "dardar-";
  const hasSupabase = !!(CONFIG.supabase.url && CONFIG.supabase.anonKey) && typeof window.supabase === "object";
  const client = hasSupabase ? window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey) : null;

  /* ---------- الوضع المحلي ---------- */
  function lsRead(table, fallback = []) {
    try { const raw = localStorage.getItem(LS + table); return raw === null ? fallback : JSON.parse(raw); }
    catch (_) { return fallback; }
  }
  function lsWrite(table, rows) { try { localStorage.setItem(LS + table, JSON.stringify(rows)); } catch (_) {} }
  function seedIfEmpty() {
    const map = {
      announcements: SEED.announcements, classes: SEED.classes, schedule: SEED.schedule,
      exams: SEED.exams, documents: SEED.documents, appointments: []
    };
    Object.entries(map).forEach(([t, rows]) => { if (localStorage.getItem(LS + t) === null) lsWrite(t, rows); });
  }
  function nextId(rows) { return rows.reduce((m, r) => Math.max(m, Number(r.id) || 0), 1000) + 1; }
  if (!client) seedIfEmpty();

  /* ---------- عمليات موحّدة ---------- */
  async function list(table) {
    if (!client) return lsRead(table);
    try {
      const { data, error } = await client.from(table).select("*");
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn(`[db] تعذّر جلب «${table}» (${e.message}) — استخدام البيانات المحلية`);
      return lsRead(table);
    }
  }

  async function insert(table, row) {
    if (!client) {
      const rows = lsRead(table);
      const rec = { id: nextId(rows), ...row };
      rows.push(rec); lsWrite(table, rows);
      return rec;
    }
    const { data, error } = await client.from(table).insert(row).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  async function update(table, id, patch) {
    if (!client) {
      const rows = lsRead(table);
      const i = rows.findIndex(r => String(r.id) === String(id));
      if (i === -1) return null;
      rows[i] = { ...rows[i], ...patch };
      lsWrite(table, rows);
      return rows[i];
    }
    const { data, error } = await client.from(table).update(patch).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  async function remove(table, id) {
    if (!client) { lsWrite(table, lsRead(table).filter(r => String(r.id) !== String(id))); return true; }
    const { error } = await client.from(table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }

  /* ---------- البريد الفعلي (Edge Function + Resend) ---------- */
  async function sendEmail(subject, body) {
    if (!client) return false;
    try {
      const res = await fetch(`${CONFIG.supabase.url}/functions/v1/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": CONFIG.supabase.anonKey,
          "Authorization": `Bearer ${CONFIG.supabase.anonKey}`
        },
        body: JSON.stringify({ subject, body })
      });
      const json = await res.json().catch(() => ({}));
      return !!json.ok;
    } catch (_) { return false; }
  }

  /* ---------- طلب موعد: حفظ + بريد ---------- */
  async function submitAppointment(data) {
    const ref = "AP-" + Date.now().toString(36).toUpperCase().slice(-6);
    const record = { ...data, ref, status: "جديد" };
    let stored = true;
    try { await insert("appointments", record); } catch (e) { stored = false; console.warn(e); }

    const bodyText =
      `طلب موعد — مرجع ${ref}\n\n` +
      `ولي الأمر: ${data.parent_name}\nالتلميذ: ${data.student_name}\nالقسم: ${data.class_name}\n` +
      `الهاتف: ${data.phone}\nالتاريخ المفضّل: ${data.preferred_date}\nالفترة: ${data.slot}\n\n` +
      `سبب الطلب:\n${data.reason}\n\n— أُرسل من موقع ${CONFIG.school.name}`;

    const emailed = await sendEmail(`طلب موعد — مرجع ${ref}`, bodyText);

    const mailto = `mailto:${CONFIG.school.email}?subject=${encodeURIComponent("طلب موعد — مرجع " + ref)}&body=${encodeURIComponent(bodyText)}`;
    return { ref, stored, emailed, mailto, bodyText };
  }

  /* ---------- المصادقة (لوحة الأساتذة) ---------- */
  const auth = {
    async login(email, password) {
      if (!client) return { ok: true, demo: true };
      const { error } = await client.auth.signInWithPassword({ email, password });
      return { ok: !error, error: error ? error.message : "" };
    },
    async logout() { if (client) { try { await client.auth.signOut(); } catch (_) {} } },
    async session() { if (!client) return null; const { data } = await client.auth.getSession(); return data.session; }
  };

  /* الواجهة العامة */
  window.DB = {
    mode: client ? "supabase" : "local",
    list, insert, update, remove, sendEmail, submitAppointment, auth
  };
})();
