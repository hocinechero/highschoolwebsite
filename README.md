# Lycée Dardar Bouzid — Plateforme scolaire / School platform / منصة مدرسية

> **FR** · Une plateforme web complète pour un lycée public algérien : site public, panel d'administration enseignants, base de données Supabase et envoi d'e-mails réels.
> **EN** · A complete web platform for a public Algerian high school: public site, teacher admin panel, Supabase database and real e-mail delivery.
> **AR** · منصة ويب متكاملة لثانوية عمومية جزائرية: موقع عام، لوحة تحكم للأساتذة، قاعدة بيانات Supabase، وإرسال بريد فعلي.

---

<div dir="rtl">

## العربية

### ما هو هذا المشروع؟

منصة رقمية لثانوية دردار بوزيد بالعلمة (ولاية سطيف، الجزائر)، مبنية كنسختين منفصلتين:

1. **الموقع العام** (`index.html`) — للتلاميذ وأولياء الأمور:
   - الرئيسية: تعريف بالمؤسسة + الأهداف + آخر الإعلانات بالصور
   - الإعلانات: مصنّفة، قابلة للتصفية، بصور وتواريخ
   - الجدول الدراسي: اختيار القسم → جدول أسبوعي واضح واحد، قابل للطباعة
   - الاختبارات: المواعيد مرتبة زمنياً، مع تصفية (فروض / اختبارات)
   - الاتصال: بريد + هاتف + نموذج طلب موعد برقم مرجعي
   - الموقع: خريطة تفاعلية (OpenStreetMap) + الاتجاهات

2. **لوحة الأساتذة** (`admin.html`) — محمية بكلمة مرور:
   - نشر إعلان (عنوان، تصنيف، نص، صورة، تمييز في الرئيسية)
   - تحديث الجدول: إدارة الأقسام وإضافة/حذف الحصص
   - الوثائق الداخلية بروابط تحميل
   - طلبات مواعيد الأولياء: قراءة، تغيير الحالة (جديد/مؤكد/مرفوض)، حذف

### البنية التقنية

| الملف | الدور |
|---|---|
| `index.html` | الموقع العام |
| `admin.html` | لوحة التحكم |
| `config.js` | الإعدادات + البيانات الأولية (المكان الوحيد للتعديل الإداري) |
| `db.js` | طبقة البيانات: Supabase أو وضع محلي (localStorage) |
| `supabase/schema.sql` | 6 جداول + سياسات RLS |
| `supabase/functions/send-email/` | دالة Edge لإرسال البريد عبر Resend |

**القرارات الهندسية الجوهرية:**

- **وضعان للتشغيل بلا كود مختلف:** عند غياب مفاتيح Supabase يعمل النظام كاملاً بالتخزين المحلي (يجعل التطوير والعرض يعملان فوراً، والانتقال للإنتاج تعبئة حقلين فقط).
- **الأمان بـ RLS لا بالمفاتيح:** المفتاح العام (anon) يظهر في المتصفح بحكم التصميم؛ من يكتب هو فقط من سُجّل في جدول `staff`. المفتاح السري لا يظهر في أي ملف أمامي.
- **البريد لا يُفقد الطلب:** طلب الموعد يُحفظ في قاعدة البيانات أولاً، ثم يُرسل بريدياً؛ فشل البريد لا يضيّع الطلب (يظهر في لوحة الطلبات ويُفتح mailto كبديل).
- **فشل الاتصال بالقاعدة لا يقتل الموقع:** القراءة تسقط تلقائياً للبيانات المحلية.

### تشغيل سريع

```bash
git clone <repository-url>
cd inquiry-about-identity
# لا بناء ولا تثبيت: افتح index.html مباشرة في المتصفح
```

الوضع المحلي يعمل فوراً (شريط أصفر يوضّح أنه تجريبي).

### الربط بالإنتاج (Supabase)

1. أنشئ مشروعاً في supabase.com ونفّذ `supabase/schema.sql` من SQL Editor.
2. أنشئ حسابات الأساتذة: Authentication → Users → Add user، ثم:
   ```sql
   insert into public.staff (user_id, full_name)
   values ('<uuid>', '<الاسم>');
   ```
3. انشر دالة البريد:
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxx
   supabase functions deploy send-email
   ```
4. ضع الرابط والمفتاح العام في `config.js` — ينتقل النظام تلقائياً للوضع المتصل.

التفاصيل الكاملة بخطوات التحقق في `README.md` الداخلي.

### البيانات الأولية

8 إعلانات بالصور، 3 أقسام، 75 حصة (25 لكل قسم)، 20 موعد اختبار، 4 وثائق داخلية.

### المهارات المُظهرة

بنية متعددة الملفات · تصميم صلاحيات RLS · طبقة تجريد بيانات بنمط fallback · مصادقة Supabase Auth · تكامل خارجي (Edge Function + Resend) بأسرار خارج المتصفح · توجيه SPA بالـ hash · RTL عربي كامل · وصولية ARIA · أنماط طباعة · استجابة من 320px.

### الحد الواقعي (مذكور بصراحة)

قُيّمت الخدمة فعلياً قبل الإطلاق: القنوات الجاهزة (فيسبوك/تيلغرام/فضاء الأولياء) تغطي معظم الحاجة، والصيانة اليومية تتطلب شخصاً مكلّفاً رسمياً. لذلك المشروع **نموذج مرجعي مهني** (portfolio) لا خدمة مطلقة حالياً — وهذا القرار نفسه جزء من المهارة: تقييم «هل يُبنى؟» قبل البناء.

</div>

---

## English

### What is this project?

A digital platform for Lycée Dardar Bouzid in El Eulma (Sétif, Algeria), built as two separate applications:

1. **Public site** (`index.html`) — for students and parents:
   - Home: school introduction + goals + latest news with photos
   - Announcements: categorized, filterable, with images and dates
   - Timetable: pick your class → one clear weekly grid, printable
   - Exams: dates sorted chronologically, filter (quizzes / exams)
   - Contact: email + phone + appointment request with reference number
   - Location: interactive map (OpenStreetMap) + directions

2. **Teacher panel** (`admin.html`) — password-protected:
   - Publish announcements (title, category, body, image, home featuring)
   - Timetable management: add classes, add/remove periods
   - Internal documents with download links
   - Parent appointment requests: read, change status (new/confirmed/rejected), delete

### Technical architecture

| File | Role |
|---|---|
| `index.html` | Public site |
| `admin.html` | Admin panel |
| `config.js` | Settings + seed data (single place for admin edits) |
| `db.js` | Data layer: Supabase or local mode (localStorage) |
| `supabase/schema.sql` | 6 tables + RLS policies |
| `supabase/functions/send-email/` | Edge function sending e-mail via Resend |

**Key engineering decisions:**

- **Two run modes, one codebase:** without Supabase keys the whole system runs on localStorage (instant development and demos); moving to production is filling two fields.
- **Security by RLS, not by secrets:** the anon key is public by design; only users listed in the `staff` table can write. The service-role key never appears in any front-end file.
- **E-mail never loses the request:** an appointment is saved to the database first, then e-mailed; if mail fails, the request still exists (visible in the requests panel, with a mailto fallback).
- **Database failure doesn't kill the site:** reads fall back automatically to local data.

### Quick start

```bash
git clone <repository-url>
cd inquiry-about-identity
# No build, no install: open index.html directly in a browser
```

Local mode works immediately (a yellow banner marks it as demo).

### Production wiring (Supabase)

1. Create a project on supabase.com and run `supabase/schema.sql` in SQL Editor.
2. Create teacher accounts: Authentication → Users → Add user, then:
   ```sql
   insert into public.staff (user_id, full_name)
   values ('<uuid>', '<name>');
   ```
3. Deploy the e-mail function:
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxx
   supabase functions deploy send-email
   ```
4. Put the project URL and anon key in `config.js` — the system switches to connected mode automatically.

Full step-by-step details with verification live in the inner `README.md`.

### Seed data

8 announcements with images, 3 classes, 75 periods (25 per class), 20 exam dates, 4 internal documents.

### Skills demonstrated

Multi-file architecture · RLS permission design · data-layer abstraction with fallback pattern · Supabase Auth · external integration (Edge Function + Resend) with browser-invisible secrets · hash-based SPA routing · full Arabic RTL · ARIA accessibility · print stylesheets · responsive from 320px.

### The honest limitation

The service was genuinely evaluated before launch: ready-made channels (Facebook/Telegram/the ministry's parent portal) cover most of the need, and daily maintenance requires an officially assigned person. This project is therefore a **professional reference implementation** (portfolio), not a currently deployed service — and that decision itself is part of the skill: asking "should it be built?" before building.

---

## Français

### Qu'est-ce que ce projet ?

Une plateforme numérique pour le lycée Dardar Bouzid à El Eulma (Sétif, Algérie), construite en deux applications séparées :

1. **Site public** (`index.html`) — pour les élèves et les parents :
   - Accueil : présentation de l'établissement + objectifs + dernières actualités avec photos
   - Annonces : classées, filtrables, avec images et dates
   - Emploi du temps : choisir sa classe → une seule grille hebdomadaire claire, imprimable
   - Évaluations : dates triées chronologiquement, filtre (devoirs / examens)
   - Contact : e-mail + téléphone + formulaire de rendez-vous avec numéro de référence
   - Localisation : carte interactive (OpenStreetMap) + itinéraires

2. **Panneau enseignants** (`admin.html`) — protégé par mot de passe :
   - Publier des annonces (titre, catégorie, texte, image, mise en avant)
   - Gestion des emplois du temps : ajouter des classes, ajouter/supprimer des séances
   - Documents internes avec liens de téléchargement
   - Demandes de rendez-vous des parents : lecture, changement de statut (nouveau/confirmé/refusé), suppression

### Architecture technique

| Fichier | Rôle |
|---|---|
| `index.html` | Site public |
| `admin.html` | Panneau d'administration |
| `config.js` | Paramètres + données initiales (seul endroit d'édition administrative) |
| `db.js` | Couche de données : Supabase ou mode local (localStorage) |
| `supabase/schema.sql` | 6 tables + politiques RLS |
| `supabase/functions/send-email/` | Edge Function d'envoi d'e-mails via Resend |

**Décisions d'ingénierie clés :**

- **Deux modes d'exécution, un seul code :** sans clés Supabase, tout le système fonctionne en localStorage (développement et démonstration immédiats) ; passer en production revient à remplir deux champs.
- **Sécurité par RLS, pas par secrets :** la clé anon est publique par conception ; seuls les utilisateurs listés dans la table `staff` peuvent écrire. La clé service_role n'apparaît jamais côté navigateur.
- **L'e-mail ne perd jamais la demande :** un rendez-vous est d'abord enregistré en base, puis envoyé par e-mail ; si l'envoi échoue, la demande existe toujours (visible dans le panneau, avec repli mailto).
- **Une panne de base ne tue pas le site :** les lectures basculent automatiquement vers les données locales.

### Démarrage rapide

```bash
git clone <repository-url>
cd inquiry-about-identity
# Aucun build, aucune installation : ouvrir index.html dans le navigateur
```

Le mode local fonctionne immédiatement (un bandeau jaune signale le mode démo).

### Mise en production (Supabase)

1. Créer un projet sur supabase.com et exécuter `supabase/schema.sql` dans SQL Editor.
2. Créer les comptes enseignants : Authentication → Users → Add user, puis :
   ```sql
   insert into public.staff (user_id, full_name)
   values ('<uuid>', '<nom>');
   ```
3. Déployer la fonction d'e-mail :
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxx
   supabase functions deploy send-email
   ```
4. Renseigner l'URL du projet et la clé anon dans `config.js` — le système passe en mode connecté automatiquement.

Les détails complets, étape par étape avec vérification, figurent dans le `README.md` interne.

### Données initiales

8 annonces avec images, 3 classes, 75 séances (25 par classe), 20 dates d'évaluations, 4 documents internes.

### Compétences démontrées

Architecture multi-fichiers · conception de permissions RLS · couche d'abstraction de données avec repli · Supabase Auth · intégration externe (Edge Function + Resend) avec secrets invisibles du navigateur · routage SPA par hash · RTL arabe complet · accessibilité ARIA · feuilles de style d'impression · responsive dès 320px.

### La limite, dite honnêtement

Le service a été réellement évalué avant lancement : les canaux existants (Facebook/Telegram/portail parents du ministère) couvrent l'essentiel du besoin, et la maintenance quotidienne exige une personne officiellement désignée. Ce projet est donc une **référence d'implémentation professionnelle** (portfolio), et non un service déployé actuellement — cette décision fait elle-même partie de la compétence : demander « faut-il le construire ? » avant de construire.

---

## Stack / البنية التقنية / Pile technique

`HTML5 · CSS (Tailwind CDN) · JavaScript vanilla · Supabase (PostgreSQL · Auth · RLS · Edge Functions) · Resend · OpenStreetMap · Cairo font · Arabic RTL`

## Author / المؤلف / Auteur

**Hocine** — [github.com/hocinechero](https://github.com/hocinechero)

## License / الرخصة / Licence

MIT — usage libre avec attribution.

## Acknowledgment / شكر وتقدير / Remerciements

Ce projet est dédié au personnel éducatif du lycée Dardar Bouzid.
هذا المشروع مهدّى للطاقم التربوي لثانوية دردار بوزيد.
This project is dedicated to the teaching staff of Lycée Dardar Bouzid.
