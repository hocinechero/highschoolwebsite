/* ============================================================
   إعدادات الموقع — المشرف يعدّل هنا فقط
   ============================================================ */

const CONFIG = {
  school: {
    name: "ثانوية دردار بوزيد",
    city: "العلمة • ولاية سطيف",
    email: "dardar.bouzid.school@gmail.com",
    phone: "036 XX XX XX", /* ← ضع رقم الهاتف الرسمي هنا */
    address: "حي التساهمي، العلمة، ولاية سطيف",
    maps: "https://maps.app.goo.gl/SAqSEkwcfBksom8GA"
  },
  /* قاعدة البيانات: ضع عنوان المشروع والمفتاح العام (anon) بعد إنشائهما في Supabase.
     اتركهما فارغين فيعمل الموقع بالوضع المحلي التجريبي (تخزين داخل المتصفح). */
  supabase: {
    url: "",
    anonKey: ""
  }
};

/* ============================================================
   البيانات الأولية — تُستخدم في الوضع المحلي، وأول تشغيل عند الربط
   ============================================================ */

const IMG = {
  class: "https://images.pexels.com/photos/34211747/pexels-photo-34211747.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1000",
  teach: "https://images.pexels.com/photos/7692552/pexels-photo-7692552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1000",
  library: "https://images.pexels.com/photos/37684702/pexels-photo-37684702.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1000"
};

const SEED = {

  classes: [
    { id: 1, name: "السنة الأولى ثانوي — 1", level: 0 },
    { id: 2, name: "السنة الثانية ثانوي — 1", level: 1 },
    { id: 3, name: "السنة الثالثة ثانوي — 1", level: 2 }
  ],

  announcements: [
    { id: 1, date: "2026-10-05", category: "دراسة", title: "نشر استعمالات الزمن الرسمية لكل الأقسام", body: "أُعلنت جداول الحصص المعتمدة على الموقع: يمكن لكل تلميذ عرض جدول قسمه كاملاً من صفحة الجدول الدراسي، مع القاعة والأوقات يوماً بيوم.", image_url: IMG.class, featured: true },
    { id: 2, date: "2026-10-04", category: "دراسة", title: "رزنامة الفروض والاختبارات متاحة الآن", body: "المواعيد المعتمدة للفصل الأول والثاني منشورة ومرتبة زمنياً في صفحة الاختبارات، مع إمكانية التصفية حسب النوع.", image_url: IMG.library, featured: true },
    { id: 3, date: "2026-10-02", category: "تواصل", title: "خدمة طلب الموعد الإلكتروني للأولياء مفعّلة", body: "يمكن لولي الأمر حجز موعد مع الإدارة مباشرة من صفحة الاتصال، مع رقم مرجعي لمتابعة الطلب.", image_url: IMG.teach, featured: true },
    { id: 4, date: "2026-09-28", category: "أنشطة", title: "انطلاق النوادي المدرسية للفصل الأول", body: "نوادي المعلوميات والمسرح والصحافة المدرسية والشطرنج تفتح أبواب التسجيل لكل التلاميذ ابتداء من الأسبوع الثاني من أكتوبر.", image_url: IMG.class, featured: false },
    { id: 5, date: "2026-09-25", category: "رقمي", title: "استخدموا الروابط الرسمية فقط", body: "لحماية بياناتكم، استخدموا منصات وزارة التربية والديوان الوطني للامتحانات من روابطها الرسمية فقط.", image_url: IMG.library, featured: false },
    { id: 6, date: "2026-09-21", category: "عام", title: "مرحباً بكم في الموقع الرسمي للثانوية", body: "مساحة موحّدة للتعريف بالمؤسسة ومتابعة الإعلانات والوصول إلى الخدمات والمعلومات الموثوقة.", image_url: IMG.teach, featured: false },
    { id: 7, date: "2026-09-18", category: "توجيه", title: "ثلاث سنوات نحو البكالوريا", body: "لكل مرحلة هدفها: التأسيس في الأولى، التخصّص في الثانية، والتحضير المركّز في الثالثة.", image_url: IMG.class, featured: false },
    { id: 8, date: "2026-09-15", category: "دراسة", title: "العمل المنتظم يصنع التقدّم", body: "نذكّر تلاميذنا بأهمية المواظبة وتنظيم الوقت والاستعانة بالأساتذة عند الحاجة.", image_url: IMG.teach, featured: false }
  ],

  /* الحصص: class_id يشير إلى id القسم، day من 0 (الأحد) إلى 4 (الخميس) */
  schedule: [
    { id: 101, class_id: 1, day: 0, start_time: "08:00", end_time: "09:00", subject: "اللغة العربية", room: "ق 10" },
    { id: 102, class_id: 1, day: 0, start_time: "09:00", end_time: "10:00", subject: "الرياضيات", room: "ق 10" },
    { id: 103, class_id: 1, day: 0, start_time: "10:15", end_time: "11:15", subject: "الفيزياء", room: "ق 10" },
    { id: 104, class_id: 1, day: 0, start_time: "11:15", end_time: "12:15", subject: "اللغة الفرنسية", room: "ق 11" },
    { id: 105, class_id: 1, day: 0, start_time: "13:00", end_time: "14:00", subject: "التاريخ والجغرافيا", room: "ق 10" },
    { id: 106, class_id: 1, day: 1, start_time: "08:00", end_time: "09:00", subject: "الرياضيات", room: "ق 10" },
    { id: 107, class_id: 1, day: 1, start_time: "09:00", end_time: "10:00", subject: "اللغة الإنجليزية", room: "ق 11" },
    { id: 108, class_id: 1, day: 1, start_time: "10:15", end_time: "11:15", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 109, class_id: 1, day: 1, start_time: "11:15", end_time: "12:15", subject: "اللغة العربية", room: "ق 10" },
    { id: 110, class_id: 1, day: 1, start_time: "13:00", end_time: "14:00", subject: "التربية الإسلامية", room: "ق 10" },
    { id: 111, class_id: 1, day: 2, start_time: "08:00", end_time: "09:00", subject: "اللغة العربية", room: "ق 10" },
    { id: 112, class_id: 1, day: 2, start_time: "09:00", end_time: "10:00", subject: "الفيزياء", room: "مخبر الفيزياء" },
    { id: 113, class_id: 1, day: 2, start_time: "10:15", end_time: "11:15", subject: "الرياضيات", room: "ق 10" },
    { id: 114, class_id: 1, day: 2, start_time: "11:15", end_time: "12:15", subject: "اللغة الفرنسية", room: "ق 11" },
    { id: 115, class_id: 1, day: 2, start_time: "13:00", end_time: "14:00", subject: "التربية البدنية", room: "الساحة" },
    { id: 116, class_id: 1, day: 3, start_time: "08:00", end_time: "09:00", subject: "الرياضيات", room: "ق 10" },
    { id: 117, class_id: 1, day: 3, start_time: "09:00", end_time: "10:00", subject: "التاريخ والجغرافيا", room: "ق 10" },
    { id: 118, class_id: 1, day: 3, start_time: "10:15", end_time: "11:15", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 119, class_id: 1, day: 3, start_time: "11:15", end_time: "12:15", subject: "اللغة الإنجليزية", room: "ق 11" },
    { id: 120, class_id: 1, day: 3, start_time: "13:00", end_time: "14:00", subject: "اللغة العربية", room: "ق 10" },
    { id: 121, class_id: 1, day: 4, start_time: "08:00", end_time: "09:00", subject: "اللغة الفرنسية", room: "ق 11" },
    { id: 122, class_id: 1, day: 4, start_time: "09:00", end_time: "10:00", subject: "اللغة العربية", room: "ق 10" },
    { id: 123, class_id: 1, day: 4, start_time: "10:15", end_time: "11:15", subject: "الرياضيات", room: "ق 10" },
    { id: 124, class_id: 1, day: 4, start_time: "11:15", end_time: "12:15", subject: "الفيزياء", room: "ق 10" },
    { id: 125, class_id: 1, day: 4, start_time: "13:00", end_time: "14:00", subject: "اللغة الإنجليزية", room: "ق 11" },

    { id: 201, class_id: 2, day: 0, start_time: "08:00", end_time: "09:00", subject: "الرياضيات", room: "ق 12" },
    { id: 202, class_id: 2, day: 0, start_time: "09:00", end_time: "10:00", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 203, class_id: 2, day: 0, start_time: "10:15", end_time: "11:15", subject: "اللغة العربية", room: "ق 12" },
    { id: 204, class_id: 2, day: 0, start_time: "11:15", end_time: "12:15", subject: "الفيزياء", room: "مخبر الفيزياء" },
    { id: 205, class_id: 2, day: 0, start_time: "13:00", end_time: "14:00", subject: "اللغة الإنجليزية", room: "ق 12" },
    { id: 206, class_id: 2, day: 1, start_time: "08:00", end_time: "09:00", subject: "الفلسفة", room: "ق 12" },
    { id: 207, class_id: 2, day: 1, start_time: "09:00", end_time: "10:00", subject: "الرياضيات", room: "ق 12" },
    { id: 208, class_id: 2, day: 1, start_time: "10:15", end_time: "11:15", subject: "اللغة الفرنسية", room: "ق 12" },
    { id: 209, class_id: 2, day: 1, start_time: "11:15", end_time: "12:15", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 210, class_id: 2, day: 1, start_time: "13:00", end_time: "14:00", subject: "التاريخ والجغرافيا", room: "ق 12" },
    { id: 211, class_id: 2, day: 2, start_time: "08:00", end_time: "09:00", subject: "اللغة العربية", room: "ق 12" },
    { id: 212, class_id: 2, day: 2, start_time: "09:00", end_time: "10:00", subject: "الفيزياء", room: "مخبر الفيزياء" },
    { id: 213, class_id: 2, day: 2, start_time: "10:15", end_time: "11:15", subject: "الرياضيات", room: "ق 12" },
    { id: 214, class_id: 2, day: 2, start_time: "11:15", end_time: "12:15", subject: "اللغة الإنجليزية", room: "ق 12" },
    { id: 215, class_id: 2, day: 2, start_time: "13:00", end_time: "14:00", subject: "التربية الإسلامية", room: "ق 12" },
    { id: 216, class_id: 2, day: 3, start_time: "08:00", end_time: "09:00", subject: "الرياضيات", room: "ق 12" },
    { id: 217, class_id: 2, day: 3, start_time: "09:00", end_time: "10:00", subject: "اللغة الفرنسية", room: "ق 12" },
    { id: 218, class_id: 2, day: 3, start_time: "10:15", end_time: "11:15", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 219, class_id: 2, day: 3, start_time: "11:15", end_time: "12:15", subject: "الفلسفة", room: "ق 12" },
    { id: 220, class_id: 2, day: 3, start_time: "13:00", end_time: "14:00", subject: "التربية البدنية", room: "الساحة" },
    { id: 221, class_id: 2, day: 4, start_time: "08:00", end_time: "09:00", subject: "اللغة الإنجليزية", room: "ق 12" },
    { id: 222, class_id: 2, day: 4, start_time: "09:00", end_time: "10:00", subject: "الرياضيات", room: "ق 12" },
    { id: 223, class_id: 2, day: 4, start_time: "10:15", end_time: "11:15", subject: "الفيزياء", room: "مخبر الفيزياء" },
    { id: 224, class_id: 2, day: 4, start_time: "11:15", end_time: "12:15", subject: "اللغة العربية", room: "ق 12" },
    { id: 225, class_id: 2, day: 4, start_time: "13:00", end_time: "14:00", subject: "التاريخ والجغرافيا", room: "ق 12" },

    { id: 301, class_id: 3, day: 0, start_time: "08:00", end_time: "09:00", subject: "الرياضيات", room: "ق 15" },
    { id: 302, class_id: 3, day: 0, start_time: "09:00", end_time: "10:00", subject: "الفيزياء", room: "مخبر الفيزياء" },
    { id: 303, class_id: 3, day: 0, start_time: "10:15", end_time: "11:15", subject: "اللغة العربية", room: "ق 15" },
    { id: 304, class_id: 3, day: 0, start_time: "11:15", end_time: "12:15", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 305, class_id: 3, day: 0, start_time: "13:00", end_time: "14:00", subject: "الفلسفة", room: "ق 15" },
    { id: 306, class_id: 3, day: 1, start_time: "08:00", end_time: "09:00", subject: "اللغة الفرنسية", room: "ق 15" },
    { id: 307, class_id: 3, day: 1, start_time: "09:00", end_time: "10:00", subject: "الرياضيات", room: "ق 15" },
    { id: 308, class_id: 3, day: 1, start_time: "10:15", end_time: "11:15", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 309, class_id: 3, day: 1, start_time: "11:15", end_time: "12:15", subject: "اللغة العربية", room: "ق 15" },
    { id: 310, class_id: 3, day: 1, start_time: "13:00", end_time: "14:00", subject: "اللغة الإنجليزية", room: "ق 15" },
    { id: 311, class_id: 3, day: 2, start_time: "08:00", end_time: "09:00", subject: "الرياضيات", room: "ق 15" },
    { id: 312, class_id: 3, day: 2, start_time: "09:00", end_time: "10:00", subject: "الفيزياء", room: "مخبر الفيزياء" },
    { id: 313, class_id: 3, day: 2, start_time: "10:15", end_time: "11:15", subject: "اللغة الإنجليزية", room: "ق 15" },
    { id: 314, class_id: 3, day: 2, start_time: "11:15", end_time: "12:15", subject: "التاريخ والجغرافيا", room: "ق 15" },
    { id: 315, class_id: 3, day: 2, start_time: "13:00", end_time: "14:00", subject: "التربية الإسلامية", room: "ق 15" },
    { id: 316, class_id: 3, day: 3, start_time: "08:00", end_time: "09:00", subject: "اللغة العربية", room: "ق 15" },
    { id: 317, class_id: 3, day: 3, start_time: "09:00", end_time: "10:00", subject: "الفيزياء", room: "مخبر الفيزياء" },
    { id: 318, class_id: 3, day: 3, start_time: "10:15", end_time: "11:15", subject: "الرياضيات", room: "ق 15" },
    { id: 319, class_id: 3, day: 3, start_time: "11:15", end_time: "12:15", subject: "اللغة الفرنسية", room: "ق 15" },
    { id: 320, class_id: 3, day: 3, start_time: "13:00", end_time: "14:00", subject: "الفلسفة", room: "ق 15" },
    { id: 321, class_id: 3, day: 4, start_time: "08:00", end_time: "09:00", subject: "العلوم الطبيعية", room: "مخبر العلوم" },
    { id: 322, class_id: 3, day: 4, start_time: "09:00", end_time: "10:00", subject: "اللغة العربية", room: "ق 15" },
    { id: 323, class_id: 3, day: 4, start_time: "10:15", end_time: "11:15", subject: "الرياضيات", room: "ق 15" },
    { id: 324, class_id: 3, day: 4, start_time: "11:15", end_time: "12:15", subject: "اللغة الإنجليزية", room: "ق 15" },
    { id: 325, class_id: 3, day: 4, start_time: "13:00", end_time: "14:00", subject: "التربية البدنية", room: "الساحة" }
  ],

  /* level: 0 الأولى، 1 الثانية، 2 الثالثة */
  exams: [
    { id: 1, date: "2026-11-15", type: "فرض", level: 0, subject: "الرياضيات", scope: "الدوال العددية" },
    { id: 2, date: "2026-11-16", type: "فرض", level: 0, subject: "اللغة العربية", scope: "الظاهرة اللغوية" },
    { id: 3, date: "2026-11-17", type: "فرض", level: 1, subject: "الفيزياء", scope: "التفاعلات الكيميائية" },
    { id: 4, date: "2026-11-18", type: "فرض", level: 1, subject: "الرياضيات", scope: "الدوال والنهايات" },
    { id: 5, date: "2026-11-19", type: "فرض", level: 2, subject: "العلوم الطبيعية", scope: "التنفس الخلوي" },
    { id: 6, date: "2026-11-20", type: "فرض", level: 2, subject: "الرياضيات", scope: "الدوال العددية" },
    { id: 7, date: "2026-12-13", type: "اختبار", level: 0, subject: "الرياضيات", scope: "الفصل الأول" },
    { id: 8, date: "2026-12-14", type: "اختبار", level: 0, subject: "اللغة العربية", scope: "الفصل الأول" },
    { id: 9, date: "2026-12-14", type: "اختبار", level: 1, subject: "الرياضيات", scope: "الفصل الأول" },
    { id: 10, date: "2026-12-15", type: "اختبار", level: 0, subject: "الفيزياء", scope: "الفصل الأول" },
    { id: 11, date: "2026-12-15", type: "اختبار", level: 2, subject: "الرياضيات", scope: "الفصل الأول" },
    { id: 12, date: "2026-12-16", type: "اختبار", level: 1, subject: "العلوم الطبيعية", scope: "الفصل الأول" },
    { id: 13, date: "2026-12-17", type: "اختبار", level: 2, subject: "الفيزياء", scope: "الفصل الأول" },
    { id: 14, date: "2027-03-14", type: "فرض", level: 0, subject: "اللغة الفرنسية", scope: "الفصل الثاني" },
    { id: 15, date: "2027-03-15", type: "فرض", level: 1, subject: "اللغة العربية", scope: "الفصل الثاني" },
    { id: 16, date: "2027-03-16", type: "فرض", level: 2, subject: "الفلسفة", scope: "منهجية المقالة" },
    { id: 17, date: "2027-04-18", type: "اختبار", level: 0, subject: "العلوم الطبيعية", scope: "الفصل الثاني" },
    { id: 18, date: "2027-04-18", type: "اختبار", level: 1, subject: "اللغة العربية", scope: "الفصل الثاني" },
    { id: 19, date: "2027-04-19", type: "اختبار", level: 2, subject: "العلوم الطبيعية", scope: "الفصل الثاني" },
    { id: 20, date: "2027-05-09", type: "اختبار نموذجي", level: 2, subject: "الرياضيات", scope: "محاكاة بكالوريا شاملة" }
  ],

  /* وثائق داخلية للأساتذة — تُدار من لوحة التحكم */
  documents: [
    { id: 1, title: "نموذج مذكرة التربص الأسبوعي", kind: "نموذج", size: "8 KB", url: "" },
    { id: 2, title: "دليل إجراءات مجالس الأقسام", kind: "دليل", size: "10 KB", url: "" },
    { id: 3, title: "نموذج شهادة مدرسية معتمد", kind: "نموذج", size: "6 KB", url: "" },
    { id: 4, title: "جدول الحراسة العامة للفصل الأول", kind: "جدول", size: "9 KB", url: "" }
  ]
};

/* أسماء الأيام والمستويات — مشتركة بين الموقعين */
const DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];
const LEVELS = ["السنة الأولى ثانوي", "السنة الثانية ثانوي", "السنة الثالثة ثانوي"];
