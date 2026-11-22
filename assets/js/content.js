/* All site content, Arabic + English. Facts come from Razan's CV, project files (Drive, Canva, GitHub).
   Edit text here; every page renders from this file. */
window.CONTENT = {
  person: {
    name: { ar: "رزان العوض", en: "Razan Al-Awadh" },
    brand: { ar: "رزان — ما وراء الأفكار", en: "RAZAN — Beyond Ideas" },
    title: { ar: "مديرة مشاريع – الذكاء الاصطناعي التوليدي", en: "Project Manager – GenAI" },
    focus: {
      ar: ["إدارة المشاريع", "الابتكار", "التقنية", "تطوير المنتجات"],
      en: ["Project Management", "Innovation", "Technology", "Product Development"]
    },
    headline: { ar: "أحوّل الأفكار إلى <em>أثر</em>.", en: "Turning Ideas into <em>Impact</em>." },
    intro: {
      ar: "أحوّل الأفكار إلى حلول ذات معنى، بالإبداع والتفكير الاستراتيجي والتقنية.",
      en: "I transform ideas into meaningful solutions through creativity, strategic thinking, and technology."
    },
    location: { ar: "القصيم – الرياض", en: "Qassim – Riyadh" },
    email: "razan.alawdh@gmail.com",
    phone: "",
    linkedin: "https://www.linkedin.com/in/razan-alawadh-6a3841389",
    github: "https://github.com/RZNpro",
    cv: "cv.html",
    roles: { ar: "مديرة مشاريع | مبتكرة | متعلّمة مدى الحياة", en: "Project Manager | Innovator | Lifelong Learner" },
    quote: { ar: "«احلم أكبر. ابنِ أفضل.»", en: "“Dream bigger. Build better.”" }
  },

  about: {
    lead: {
      ar: "مبتكرة طموحة مهتمة بصناعة الأثر، بخلفية في علوم الحاسب. أتخصص في هندسة الأفكار وتحويلها إلى مشاريع ملموسة ذات قيمة استراتيجية.",
      en: "An ambitious innovator focused on creating meaningful impact, with a foundation in Computer Science. I specialise in ideation engineering: turning abstract concepts into tangible projects with strategic value."
    },
    body: {
      ar: "أقود المشاريع من الفكرة الأولى حتى الإطلاق، وأربط بين العمق التقني والتصميم الجمالي والسرد البصري. أطمح لقيادة مبادرات نوعية في قطاعات السياحة والثقافة والتقنية، وتوظيف الابتكار الرقمي لصناعة تجارب استثنائية وقيمة مستدامة للمنظمات والمجتمع.",
      en: "I lead projects from first concept to launch, bridging technical depth, aesthetic design and visual storytelling. I aim to lead pioneering initiatives across tourism, culture and technology, using digital innovation to craft exceptional experiences and lasting value for organisations and society."
    },
    facts: [
      { k: { ar: "التعليم", en: "Education" }, v: { ar: "بكالوريوس علوم الحاسب — 4.63 / 5", en: "BSc Computer Science — 4.63 / 5" } },
      { k: { ar: "الإدارة", en: "Management" }, v: { ar: "دبلوم PMP · Scrum (SFC, SAC)", en: "PMP Diploma · Scrum (SFC, SAC)" } },
      { k: { ar: "الموقع", en: "Based in" }, v: { ar: "القصيم – الرياض", en: "Qassim – Riyadh" } },
      { k: { ar: "اللغات", en: "Languages" }, v: { ar: "العربية · الإنجليزية · اليابانية · الصينية", en: "Arabic · English · Japanese · Chinese" } }
    ],
    interests: {
      ar: ["التاريخ والتراث المحلي", "ريادة الأعمال الاجتماعية", "السرد البصري وفنون الوسائط", "الذكاء الاصطناعي والتقنيات الناشئة", "اللغات والتبادل الثقافي"],
      en: ["Local history & heritage", "Social entrepreneurship", "Visual storytelling & media arts", "AI & emerging technology", "Languages & cultural exchange"]
    }
  },

  /* Project categories used for filters */
  categories: {
    all: { ar: "الكل", en: "All" },
    product: { ar: "منتجات وابتكار", en: "Product & Innovation" },
    apps: { ar: "تطبيقات وبرمجة", en: "Apps & Code" },
    games: { ar: "ألعاب وتلعيب", en: "Games & Gamification" },
    media: { ar: "أفلام ومحتوى", en: "Film & Media" }
  },

  projects: [
    {
      slug: "al-hisn", featured: true, cat: "product", art: [1308, 175], year: "2026",
      title: { ar: "الحِصن", en: "Al-Hisn" },
      kicker: { ar: "ذاكرة الصمود في بلاد الحزم — تجربة تراثية تفاعلية", en: "Memory of Resilience — an interactive heritage experience" },
      summary: {
        ar: "تجربة تفاعلية لتاريخ الرس في موقع الجريف بمحافظة الرس، من دراسة الاحتياج حتى الهوية والموقع الإلكتروني والخطة المالية.",
        en: "An interactive experience of Al-Rass history at Al-Jurayf, Qassim — from needs study to brand, website and financial plan."
      },
      role: { ar: "ابتكار ومنتجات استراتيجية — مع مجموعة أبان", en: "Innovation & Strategic Products — with Abaan Group" },
      tags: ["Product Strategy", "Business Model", "Brand Identity", "Heritage"],
      challenge: {
        ar: "تحويل تاريخ الرس وموقع الجريف إلى وجهة يعيشها الزائر، بنموذج تشغيل قابل للاستدامة.",
        en: "Turn the history of Al-Rass and the Al-Jurayf site into a destination people experience first-hand, with an operating model that can sustain itself."
      },
      approach: {
        ar: ["دراسة ميدانية وتحليل للوضع الراهن", "نموذج تجاري: دخول مجاني، تذاكر متدرّجة، ومصادر إيراد", "حجم السوق وخريطة المنافسة", "مرحلة صفر، خارطة طريق، ونموذج أولي", "مؤشرات قياس الأثر، الشراكات، والتمويل المطلوب"],
        en: ["Field study and current-state analysis", "Business model: free entry, tiered tickets and revenue streams", "Market sizing and competitive map", "Phase zero, roadmap and initial model", "Impact KPIs, partnerships and funding ask"]
      },
      solution: {
        ar: "خمس تجارب تفاعلية بفئات عمرية ومدد محددة، ومرافق مجانية، ونموذج تذاكر متدرّج، ونظام حجز جاهز للتفعيل عند الافتتاح.",
        en: "Five interactive experiences with set durations and age groups, free public facilities, a tiered ticket model, and a booking system ready to switch on at opening."
      },
      outcome: {
        ar: ["موقع إلكتروني رسمي منشور بالهوية المعتمدة", "دليل هوية بصرية كامل", "خطة مالية وعرض تفصيلي (36 صفحة)", "حساب إنستقرام @hisn.ars"],
        en: ["Official website launched in the approved identity", "Complete visual identity guide", "Financial plan and 36-page detailed deck", "Instagram presence @hisn.ars"]
      },
      tools: ["Needs Assessment", "Financial Modelling", "Brand Guide", "Web"],
      links: [{ label: "Instagram @hisn.ars", url: "https://instagram.com/hisn.ars" }]
    },
    {
      slug: "madad", featured: true, cat: "product", art: [905, 255], year: "2026",
      title: { ar: "مدد", en: "Madad" },
      kicker: { ar: "نظام تشغيل ذكي للحياة المالية — هاكاثون أمد", en: "A smart operating system for your financial life — Amad Hackathon" },
      summary: {
        ar: "تطبيق يكافئك عندما تبني مستقبلك المالي لا عندما تنفق: أسلوب كاكيبو الياباني مع التلعيب، ودفع QR فوري للمنشآت الصغرى.",
        en: "An app that rewards you for building your financial future, not for spending: Japanese Kakeibo budgeting plus gamification, and instant QR pay for micro-merchants."
      },
      role: { ar: "مُعدّة وثيقة متطلبات المنتج (PRD) — فريق سرمد", en: "Author of the Product Requirements Document — Team Sarmad" },
      tags: ["PRD", "Gamification", "FinTech", "Prototype"],
      context: {
        ar: "هاكاثون أمد — مسار التلعيب، مصرف الإنماء وأكاديمية طويق (16–18 يوليو 2026).",
        en: "Amad Hackathon — Gamification track, Alinma Bank × Tuwaiq Academy (16–18 July 2026)."
      },
      challenge: {
        ar: "المال الرقمي فقد ملموسيته فصار ضبط الإنفاق أصعب، وتطبيقات الميزانية رتيبة يتركها الناس خلال أسابيع، والأسر المنتجة والبسطات لا تستطيع استقبال المدفوعات دون أجهزة نقاط بيع.",
        en: "Digital money has lost its tangibility, making spending hard to control; budgeting apps are dull and abandoned within weeks; and home businesses and stalls can't take payments without POS devices."
      },
      approach: {
        ar: ["تعريف شخصيتين مستهدفتين: «سلمان» المستخدم الشخصي و«أم سارة» التاجرة الصغيرة", "بناء هيكل المنتج على أربعة محاور متكاملة", "صياغة الرؤية والمتطلبات حتى جاهزية الـ MVP", "قصة الحاجة وعرض الهاكاثون وفيديو توضيحي للواجهات"],
        en: ["Defined two personas: “Salman”, a personal user, and “Umm Sarah”, a micro-merchant", "Structured the product around four connected pillars", "Wrote vision and requirements to MVP-ready level", "Need story, hackathon pitch and a POC walkthrough video"]
      },
      solution: {
        ar: "أربعة محاور: الأظرف الذكية، محرك التلعيب، المساعد الذكي، و Flash Pay للدفع الفوري عبر QR.",
        en: "Four pillars: Smart Envelopes, a Gamification Engine, an AI Assistant, and Flash Pay for instant QR payments."
      },
      outcome: {
        ar: ["وثيقة PRD شاملة (16 صفحة) جاهزة للتنفيذ", "فيديو POC يشرح التطبيق وواجهاته", "عرض تقديمي للهاكاثون"],
        en: ["Comprehensive 16-page PRD, ready to build", "POC video walking through the app and its screens", "Hackathon pitch deck"]
      },
      tools: ["PRD", "Personas", "Product Architecture", "Gamification"]
    },
    {
      slug: "athar-portal", featured: true, cat: "product", art: [1412, 535], year: "2025",
      title: { ar: "بوابة الأثر", en: "Athar Portal" },
      kicker: { ar: "منصة وطنية لخدمات ومنتجات القطاع غير الربحي", en: "A national platform for non-profit services and products" },
      summary: {
        ar: "منصة تجمع أنشطة الجمعيات وخدماتها في مكان واحد وتقيس أثرها — حازت ميدالية الابتكار في إمباكتثون الذكاء الاصطناعي.",
        en: "A platform that gathers non-profit activities and services in one place and measures their impact — winner of the Innovation Medal at the AI Impactathon."
      },
      award: { ar: "ميدالية الابتكار — إمباكتثون 2025", en: "Innovation Medal — Impactathon 2025" },
      role: { ar: "مديرة المشروع ومصممة المنتج", en: "Project Manager & Product Designer" },
      tags: ["Project Management", "GenAI", "Non-Profit", "UX"],
      context: {
        ar: "من مخرجات برنامج مسك لمهارات القطاع غير الربحي، وحاز تأييد خبراء من القطاع.",
        en: "An output of Misk’s Non-Profit Sector Skills programme, endorsed by sector experts."
      },
      challenge: {
        ar: "جمعيات تقدّم دروسًا ومحاضرات وخدمات قيّمة، لكن الناس لا يعرفون عنها: لا إعلان في وسائل التواصل ولا في مواقع الجمعيات، فيضيع الأثر.",
        en: "Associations run valuable classes, lectures and services, yet people never hear about them — nothing on social media or their own sites — so the impact is lost."
      },
      approach: {
        ar: ["ميثاق المشروع والإطار المنطقي (Logframe) ومصفوفة المخاطر", "خارطة تنفيذ بمخطط Gantt، ونموذج حوكمة وميزانية تقديرية", "تحليل أصحاب المصلحة ورحلة المستخدم بناءً على جلسات تقييم", "مذكرات العمل (SOW) ومنهجيات التشغيل", "نموذج أولي وظيفي يوظّف الذكاء الاصطناعي التوليدي"],
        en: ["Project charter, logical framework (Logframe) and risk matrix", "Gantt execution roadmap, governance model and estimated budget", "Stakeholder analysis and user journey from evaluation sessions", "Statements of Work and operating methodology", "Functional prototype powered by generative AI"]
      },
      solution: {
        ar: "بوابة رقمية موحّدة لخدمات ومنتجات القطاع غير الربحي، مع تجربة مستخدم مصممة على احتياج فعلي.",
        en: "A unified digital gateway for non-profit services and products, with a user experience designed around real needs."
      },
      outcome: {
        ar: ["ميدالية الابتكار لجودة الحل والتنفيذ — إمباكتثون الذكاء الاصطناعي في القطاع غير الربحي", "حزمة إدارة مشروع متكاملة", "دراسة احتياج مفصّلة ونموذج تطبيق (Mockup)"],
        en: ["Innovation Medal for solution quality and execution — AI in Non-Profits Impactathon", "Complete project-management pack", "Detailed needs study and app mockup"]
      },
      tools: ["Logframe", "Gantt", "SOW", "Stakeholder Analysis", "GenAI"]
    },
    {
      slug: "rafiq", featured: false, cat: "apps", art: [1432, 335], year: "2026",
      title: { ar: "رفيق", en: "Rafiq" },
      kicker: { ar: "تطبيق عربي لتعلّم القرآن بمحتوى علمي موثّق", en: "An Arabic-first Quran learning app with verified scholarly content" },
      summary: {
        ar: "يبني على آليات تطبيقات تعلّم اللغات — مسار دروس، تمارين تفاعلية، سلسلة تحفيز — بأسلوب هادئ دافئ بلمسة تراثية.",
        en: "Borrows the mechanics of language-learning apps — lesson path, interactive exercises, streaks — in a calm, warm tone with a heritage touch."
      },
      role: { ar: "صاحبة المنتج — التصميم والبناء", en: "Product owner — design & build" },
      status: { ar: "قيد التطوير", en: "In development" },
      tags: ["Next.js", "Full-stack", "RTL", "EdTech"],
      challenge: {
        ar: "تقديم محتوى علمي دقيق ومُسند لمصادره، بتجربة ممتعة تشجّع الاستمرار دون أن تفقد الوقار.",
        en: "Deliver accurate, source-referenced scholarly content in an experience that keeps learners coming back without losing its dignity."
      },
      approach: {
        ar: ["واجهة عربية بالكامل (RTL) ونظام تصميم بثيمين", "قاعدة بيانات من 14 جدولًا: المسار والدروس، التمارين، المراجعة، الحلقات وغيرها", "شاشة «اليوم» تجمع التقدّم والدقة والمداومة والذكر", "«اسأل رفيق» للإجابة داخل التمارين"],
        en: ["Fully Arabic RTL interface with a two-theme design system", "14-table data model: path & lessons, exercises, review, study circles and more", "A “Today” home screen combining progress, accuracy, streak and dhikr", "“Ask Rafiq” answers inside exercises"]
      },
      solution: {
        ar: "تطبيق ويب ونسخة iOS، بمحتوى موثّق ومصادر مرجعية لكل معلومة.",
        en: "A web app plus an iOS version, with documented sources for every piece of content."
      },
      outcome: {
        ar: ["أكثر من 48 تحديثًا مدمجًا منذ أغسطس 2026", "حزمة تسليم تصميم كاملة"],
        en: ["48+ merged updates since August 2026", "Complete design hand-off package"]
      },
      tools: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Neon Postgres", "Drizzle", "Vercel", "iOS"]
    },
    {
      slug: "clarity", featured: false, cat: "apps", art: [1080, 425], year: "2026",
      title: { ar: "Clarity", en: "Clarity" },
      kicker: { ar: "يوميات iOS تساعدك تفهم مشاعرك، كلمة كلمة", en: "An iOS journal that helps you understand how you feel, one word at a time" },
      summary: {
        ar: "سمِّ شعورك، افهمه، واختر استجابتك — تطبيق مبني على بحث ودراسة احتياج، بفريق من خمس مطوّرات.",
        en: "Name it, understand it, choose your response — an app grounded in research and a needs study, built by a team of five."
      },
      role: { ar: "عضوة فريق — بحث، تصميم، وتطوير", en: "Team member — research, design & development" },
      tags: ["SwiftUI", "UX Research", "Wellbeing", "AI"],
      challenge: {
        ar: "تحت الضغط تضيق مفرداتنا العاطفية فيصبح كل شيء «متضايق» أو «تعبان»، وتطبيقات المزاج الحالية تتتبّع ولا تشرح.",
        en: "Under stress our emotional vocabulary shrinks — everything becomes “stressed” or “tired” — and today’s mood apps track feelings without explaining them."
      },
      approach: {
        ar: ["ورقة بحثية عن المشاعر واستبيان دراسة احتياج", "تحديد الفئة المستهدفة وربط فهم المشاعر بالصحة النفسية", "مقارنة الرسوم البيانية مع محادثة الذكاء الاصطناعي", "مكتبة قوالب للكتابة العلاجية مستندة إلى الأبحاث"],
        en: ["Research paper on emotions and a needs survey", "Defined the target audience and linked emotional literacy to mental health", "Compared data charts with AI chat for insight", "A research-based library of therapeutic writing templates"]
      },
      solution: {
        ar: "يوميات بمخطط مزاج بالكلمات، وخريطة حرارية، وقوالب كتابة، وتحليل بالذكاء الاصطناعي.",
        en: "A journal with a worded mood chart, a heatmap, writing templates and AI analysis."
      },
      outcome: {
        ar: ["تطبيق iOS يعمل", "عرض مناقشة بالعربية والإنجليزية وسكربت كامل"],
        en: ["Working iOS app", "Defence presentation in Arabic and English with full script"]
      },
      tools: ["Swift", "SwiftUI", "User Research"]
    },
    {
      slug: "docs-chatbot", featured: false, cat: "apps", art: [960, 270], year: "2025",
      title: { ar: "روبوت محادثة ذكي للوثائق", en: "Intelligent Document Chatbot" },
      kicker: { ar: "مشروع التخرج — CHATBOTPro", en: "Graduation project — CHATBOTPro" },
      summary: {
        ar: "روبوت محادثة بتقنية RAG يحصر إجاباته في الوثائق المعتمدة ويحافظ على أمن المعلومات.",
        en: "A RAG chatbot that keeps answers within authorised documents and protects information security."
      },
      award: { ar: "الأول على القسم · الرابع على الكليات العلمية", en: "1st in department · 4th across science colleges" },
      role: { ar: "قائدة الفريق، مطوّرة ذكاء اصطناعي، ومصممة الهوية", en: "Team Lead, AI Developer & Visual Designer" },
      tags: ["RAG", "LLM", "Python", "Team Lead"],
      challenge: {
        ar: "روبوتات المحادثة العامة قد تجيب من خارج المصادر الموثوقة، وهذا غير مقبول عند التعامل مع وثائق حساسة.",
        en: "General chatbots may answer beyond trusted sources — unacceptable when handling sensitive documents."
      },
      approach: {
        ar: ["قيادة الفريق وتتبّع المراحل بمخطط Gantt", "بناء خط RAG بـ LangChain وقاعدة بيانات متجهة FAISS", "واجهة تفاعلية بـ Streamlit", "تصميم الهوية، كتابة التقرير النهائي، وتقديم العرض للجنة"],
        en: ["Led the team and tracked milestones with Gantt charts", "Built the RAG pipeline with LangChain and a FAISS vector store", "Interactive interface in Streamlit", "Designed the identity, wrote the final report and pitched to the jury"]
      },
      solution: {
        ar: "مساعد يجيب فقط مما تحتويه الوثائق المصرّح بها.",
        en: "An assistant that answers only from what authorised documents contain."
      },
      outcome: {
        ar: ["المركز الأول على مستوى قسم علوم الحاسب", "المركز الرابع في معرض مشاريع تخرج الكليات العلمية — جامعة القصيم"],
        en: ["1st place, Computer Science department", "4th place, Science Colleges Graduation Projects Exhibition — Qassim University"]
      },
      tools: ["Python", "LangChain", "FAISS", "Streamlit"]
    },
    {
      slug: "ewc-game", featured: false, cat: "games", art: [1505, 505], year: "2024",
      title: { ar: "لعبة كأس العالم للرياضات الإلكترونية", en: "Esports World Cup Game" },
      kicker: { ar: "مشروع تسويقي تفاعلي بمفهوم التلعيب — GamifierSA", en: "Interactive marketing game — GamifierSA internship" },
      summary: {
        ar: "لعبة ويب منشورة تجمع لعبة ذاكرة ورواية مرئية مصغّرة بنهايات متعددة، بهوية مستوحاة من الصحراء السعودية.",
        en: "A published web game combining a memory game and a mini visual novel with multiple endings, styled after the Saudi desert."
      },
      role: { ar: "المطوّرة والمصممة الرئيسية", en: "Lead Developer & Designer" },
      tags: ["Gamification", "Game Design", "GDevelop", "Launched"],
      challenge: {
        ar: "تعزيز التفاعل الوطني الرقمي مع حدث كأس العالم للرياضات الإلكترونية بتجربة قصيرة وممتعة.",
        en: "Boost national digital engagement with the Esports World Cup through a short, enjoyable experience."
      },
      approach: {
        ar: ["باليت من ذهبي رمال الصحراء وأحمر الغروب", "خلفيات بالذكاء الاصطناعي تستلهم جبل طويق", "شعار بحروف مزخرفة بنمط الصحراء وأنميشن انترو", "لعبة ذاكرة ببطاقات Pixel Art وبرمجة بنظام الأحداث", "رواية مرئية بنهايات متعددة عبر Yarn"],
        en: ["Palette of desert-sand gold and sunset red", "AI-assisted backgrounds inspired by the Tuwaiq escarpment", "Desert-patterned lettering logo and intro animation", "Pixel-art memory game built with event logic", "Visual novel with branching endings using Yarn"]
      },
      solution: {
        ar: "تجربة ويب متكاملة تُلعب مباشرة من المتصفح.",
        en: "A complete web experience playable straight in the browser."
      },
      outcome: {
        ar: ["إطلاق عام على منصة gd.games", "نموذج POC لاختبار مقاييس التفاعل", "دراسة حالة بصرية توثّق الرحلة من الرسومات الأولى للمنتج"],
        en: ["Public launch on gd.games", "POC to test engagement metrics", "Visual case study from first sketches to final product"]
      },
      tools: ["GDevelop", "Yarn", "Pixel Art", "Animation"],
      links: [{ label: { ar: "جرّب اللعبة", en: "Play the game" }, url: "https://gd.games/games/0aa1bf0c-89ef-46dc-9514-7362ba13d5de" }]
    },
    {
      slug: "guardian-of-vision", featured: false, cat: "games", art: [1240, 120], year: "2026",
      title: { ar: "حارسة الرؤية", en: "Guardian of Vision" },
      kicker: { ar: "لعبة قصصية — هاكاثون صناع المستقبل، مسار إكسبو", en: "Narrative game — Mega Future Hackathon, Expo track" },
      summary: {
        ar: "لعبة بنهايات متعددة تعتمد على قرارات اللاعب، بطابع مستقبلي تقني، طُوّرت على Unity.",
        en: "A branching-story game where the player’s choices shape the ending, with a futuristic tech mood, built in Unity."
      },
      role: { ar: "عضوة فريق — تصميم اللعبة والسرد", en: "Team member — game design & narrative" },
      tags: ["Unity", "Narrative Design", "Hackathon"],
      challenge: {
        ar: "ابتكار فكرة لعبة مؤثرة ومرتبطة بمسار إكسبو خلال وقت الهاكاثون.",
        en: "Invent a meaningful game tied to the Expo track within hackathon time."
      },
      approach: {
        ar: ["جلسات تفكير تصميمي لاختيار الفكرة", "ملف اللعبة وصفحة مانجا لقصتها", "باليت ألوان باردة من درجات الأزرق", "أنميشن القصة والأصوات بأدوات الذكاء الاصطناعي", "كتابة المراحل والألغاز والنهايات"],
        en: ["Design-thinking sessions to pick the concept", "Game document and a manga page for the story", "Cool blue palette evoking the future", "Story animation and audio made with AI tools", "Wrote levels, puzzles and endings"]
      },
      solution: {
        ar: "لعبة على Unity مع Yarn Spinner لنصوص ونهايات متعددة.",
        en: "A Unity game using Yarn Spinner for dialogue and multiple endings."
      },
      outcome: {
        ar: ["فيديو اللعبة", "ملف يوثّق ثماني مراحل للتصميم والتطوير", "عرض الهاكاثون"],
        en: ["Gameplay video", "Document tracing eight design & development stages", "Hackathon pitch"]
      },
      tools: ["Unity", "Yarn Spinner", "AI Art"]
    },
    {
      slug: "sorting-hat", featured: false, cat: "games", art: [610, 230], year: "2026",
      title: { ar: "قبعة الاختيار", en: "The Sorting Hat" },
      kicker: { ar: "تجربة تفاعلية بالكاميرا لفعالية «صناعة التعويذات»", en: "A camera-based interactive kiosk for the “Spellcraft” event" },
      summary: {
        ar: "تطبيق ويب للآيباد: الكاميرا تتبّع الرأس وتلبس الزائرة قبعة، ثم تكشف لقبها بفيديو وصحيفة قابلة للمشاركة — بالعربية والإنجليزية ودون أي اتصال بالإنترنت.",
        en: "An iPad web app: the camera tracks the head, places a hat, then reveals the visitor’s title with a shareable video and scroll — Arabic & English, fully offline."
      },
      role: { ar: "تصميم وتطوير كامل + بطاقات التحديات", en: "End-to-end design & build + challenge cards" },
      tags: ["Web", "Computer Vision", "Event Experience", "Bilingual"],
      challenge: {
        ar: "تجربة فعالية سريعة وآمنة تعمل على آيباد في وضع الكشك، تخدم زائرات متتاليات دون خادم.",
        en: "A fast, private event experience on an iPad kiosk serving visitors back-to-back with no server."
      },
      approach: {
        ar: ["مساران: خمسة أسئلة، أو «اتبعي القدر»", "تسجيل فيديو الكشف وصورة الصحيفة", "تأكيد الدفع برمز مشرفة على لوحة أرقام مخلوطة", "اختبار آلي على Chromium بكاميرا وهمية"],
        en: ["Two paths: five questions, or “follow fate”", "Records the reveal video and a scroll image", "Payment confirmation via a supervisor code on a shuffled keypad", "Automated tests in Chromium with a fake camera"]
      },
      solution: {
        ar: "تطبيق ويب مستقل بلا أي طلب شبكي خارجي، يُنشر بسحب المجلد فقط.",
        en: "A standalone web app with zero external requests, deployable by dropping a folder."
      },
      outcome: {
        ar: ["تجربة جاهزة للفعالية", "بطاقات تحديات «صناعة التعويذات» بالعربية والإنجليزية"],
        en: ["Event-ready kiosk", "“Spellcraft Challenge” cards in Arabic and English"]
      },
      tools: ["HTML/JS", "Face Tracking", "MediaRecorder"]
    },
    {
      slug: "learning-journey", featured: false, cat: "apps", art: [718, 385], year: "2026",
      title: { ar: "Learning Journey", en: "Learning Journey" },
      kicker: { ar: "تطبيق iOS لبناء عادة تعلّم يومية", en: "An iOS app for building a daily learning habit" },
      summary: {
        ar: "حدّد ما تتعلمه ومدته، سجّل يومك أو جمّده عند الحاجة، وشاهد سلسلتك تكبر.",
        en: "Set what to learn and for how long, log or freeze each day, and watch your streak grow."
      },
      role: { ar: "تصميم وتطوير", en: "Design & development" },
      tags: ["SwiftUI", "Liquid Glass", "MVVM"],
      challenge: {
        ar: "الاستمرار في التعلّم صعب، وكسر السلسلة بيوم راحة يُحبط.",
        en: "Staying consistent is hard, and losing a streak to one rest day is discouraging."
      },
      approach: {
        ar: ["أيام تجميد محسوبة: 2 أسبوعيًا، 8 شهريًا، 96 سنويًا", "تقويم لكل الأشهر وإجمالي السنة", "MVVM مع Observation وتخزين محلي"],
        en: ["Freeze days: 2 a week, 8 a month, 96 a year", "Calendar history with yearly totals", "MVVM with Observation and on-device storage"]
      },
      solution: {
        ar: "تطبيق بأزرار وبطاقات Liquid Glass، يتبع الوضع الفاتح والداكن.",
        en: "An app with native Liquid Glass buttons and cards, following light and dark mode."
      },
      outcome: {
        ar: ["مستودع عام على GitHub مع لقطات شاشة"],
        en: ["Public GitHub repository with screenshots"]
      },
      tools: ["Swift", "SwiftUI", "Observation", "UserDefaults"],
      links: [{ label: "GitHub", url: "https://github.com/RZNpro/learning-app-challange" }]
    },
    {
      slug: "ajmal-bitarikhna", featured: false, cat: "media", art: [945, 610], year: "",
      title: { ar: "أجمل بتاريخنا", en: "Ajmal Bitarikhna" },
      kicker: { ar: "فيلم ثقافي — مسابقة وزارة الثقافة", en: "Cultural short film — Ministry of Culture competition" },
      summary: {
        ar: "تصوير ومونتاج فيلم يحيي المواقع الثقافية والتاريخية في محافظة الرس.",
        en: "Filming and editing a short that brings the cultural and historic sites of Al-Rass back to life."
      },
      role: { ar: "تصوير ومونتاج", en: "Filming & editing" },
      tags: ["Film", "Editing", "Heritage"],
      challenge: {
        ar: "تحويل أماكن تاريخية مألوفة إلى قصة بصرية تلفت الانتباه لقيمتها.",
        en: "Turn familiar historic places into a visual story that draws attention to their value."
      },
      approach: {
        ar: ["اختيار المواقع والزوايا", "تصوير المشاهد", "مونتاج يبني إيقاع القصة"],
        en: ["Chose sites and angles", "Filmed the scenes", "Edited to build the story’s rhythm"]
      },
      solution: {
        ar: "فيلم قصير يعرّف بتاريخ الرس وثقافتها.",
        en: "A short film introducing the history and culture of Al-Rass."
      },
      outcome: {
        ar: ["مشاركة في مسابقة وزارة الثقافة"],
        en: ["Entry in the Ministry of Culture competition"]
      },
      tools: ["Video", "Editing"]
    }
  ],

  experience: [
    {
      role: { ar: "مبتكرة حلول بالذكاء الاصطناعي وقائدة استراتيجية المنتج", en: "AI Solutions Innovator & Product Strategy Lead" },
      org: { ar: "إمباكتثون — الذكاء الاصطناعي في المنظمات غير الربحية", en: "Impactathon — AI in Non-Profit Organisations" },
      date: "2025",
      points: {
        ar: ["تحليل تحديات الأثر الاجتماعي وهندسة فرصة لمنتج رقمي بالذكاء الاصطناعي التوليدي", "تصميم وتطوير نموذج أولي وظيفي يركز على تجربة المستخدم وقابلية التوسع", "تقديم العرض التقني النهائي — والفوز بميدالية الابتكار"],
        en: ["Analysed social-impact challenges and engineered a GenAI product opportunity", "Designed and built a functional prototype focused on UX and scalability", "Delivered the final technical pitch — awarded the Innovation Medal"]
      }
    },
    {
      role: { ar: "متدربة تطوير المنتج الرقمي والألعاب", en: "Digital Product & Game Development Intern" },
      org: { ar: "GamifierSA", en: "GamifierSA" },
      date: "2024",
      points: {
        ar: ["إتقان أساسيات JavaScript وتطوير الويب في الشهر الأول", "ابتكار حلول تلعيب لكأس العالم للرياضات الإلكترونية", "قيادة المشاريع من دراسة الجدوى وتصميم التجربة حتى الاختبار والإطلاق", "بناء نماذج POC واختبار الواجهات، وإعداد تقارير أداء تحليلية"],
        en: ["Mastered JavaScript and web fundamentals within the first month", "Designed gamification solutions for the Esports World Cup", "Led projects from feasibility and UX design through testing and launch", "Built POCs, ran UI/UX tests and produced performance reports"]
      }
    },
    {
      role: { ar: "قائدة العمليات والمحتوى", en: "Operations & Content Lead" },
      org: { ar: "برنامج تدريبي", en: "Training Programme" },
      date: "2022 – 2023",
      points: {
        ar: ["إدارة العمليات: الجدولة، تنسيق المحاضرين، ولوجستيات الفعاليات", "محتوى ترويجي رفع معدلات التسجيل والمشاركة", "تصميم مواد تعليمية وعروض احترافية، وإنتاج ومونتاج الفيديو", "تقارير أداء ومؤشرات KPIs لدعم القرار"],
        en: ["Ran operations: scheduling, speaker coordination and event logistics", "Promotional content that lifted registration and engagement", "Designed learning materials and presentations; produced and edited video", "Performance reports and KPI tracking for decision-making"]
      }
    },
    {
      role: { ar: "منسقة عمليات وعلاقات عملاء", en: "Operations & Client Relations Coordinator" },
      org: { ar: "مؤسسة تعليمية خاصة", en: "Private Educational Institution" },
      date: "2021",
      points: {
        ar: ["إدارة رحلة العميل من الاستفسار حتى تقديم الخدمة", "تطبيق Gantt وتحليل المخاطر ورسم رحلة العميل", "تصميم نماذج عمل أولية وإعداد SOW وتحليل المعنيين"],
        en: ["Managed the client journey from first enquiry to delivery", "Applied Gantt planning, risk analysis and journey mapping", "Designed POCs, drafted SOWs and ran stakeholder analysis"]
      }
    },
    {
      role: { ar: "معلمة لغة يابانية (تطوع)", en: "Japanese Language Instructor (Volunteer)" },
      org: { ar: "مبادرة «نتعلم مع بعض»", en: "“Let’s Learn Together” Initiative" },
      date: "2020 – 2022",
      points: {
        ar: ["بناء منهج كامل لتعليم اليابانية من الصفر", "محتوى رقمي وعروض تبسّط المفاهيم", "اختبارات معيارية وتغذية راجعة لمتابعة التقدّم"],
        en: ["Built a full Japanese curriculum from scratch", "Digital content and slides that simplify concepts", "Standardised tests and feedback to track progress"]
      }
    }
  ],

  achievements: [
    { icon: "medal", title: { ar: "ميدالية الابتكار", en: "Innovation Medal" }, org: { ar: "إمباكتثون — الذكاء الاصطناعي في القطاع غير الربحي", en: "Impactathon — AI in the Non-Profit Sector" }, year: "2025", project: "athar-portal" },
    { icon: "trophy", title: { ar: "من المراكز الأولى (الخامس)", en: "Top finalist (5th place)" }, org: { ar: "هاكاثون النمو — صندوق التنمية السياحي، القصيم", en: "Growth Hackathon — Tourism Development Fund, Qassim" }, year: "" },
    { icon: "trophy", title: { ar: "المركز الأول على القسم · الرابع على الكليات العلمية", en: "1st in department · 4th across science colleges" }, org: { ar: "معرض مشاريع التخرج — جامعة القصيم", en: "Graduation Projects Exhibition — Qassim University" }, year: "2025", project: "docs-chatbot" },
    { icon: "star", title: { ar: "المركز الثاني على الدفعة", en: "2nd in cohort" }, org: { ar: "برنامج مهارات القطاع غير الربحي — مؤسسة مسك", en: "Non-Profit Sector Skills Programme — Misk Foundation" }, year: "2025" },
    { icon: "cap", title: { ar: "مرتبة الشرف الثانية — 4.63 / 5", en: "Second-Class Honours — GPA 4.63 / 5" }, org: { ar: "بكالوريوس علوم الحاسب — جامعة القصيم", en: "BSc Computer Science — Qassim University" }, year: "2025" }
  ],

  library: {
    education: [
      { t: { ar: "بكالوريوس علوم الحاسب", en: "BSc Computer Science" }, o: { ar: "جامعة القصيم · ممتاز مع مرتبة الشرف الثانية", en: "Qassim University · Excellent, Second-Class Honours" }, y: "2025" },
      { t: { ar: "دبلوم إدارة المشاريع الاحترافية (PMP)", en: "Diploma in Project Management (PMP)" }, o: { ar: "كلية لندن للتدريب المهني · سكوب للتدريب · المؤسسة العامة للتدريب التقني", en: "London College for Professional Training · Scope Training · TVTC" }, y: "2026" },
      { t: { ar: "برنامج مهني متقدم: مهارات القطاع غير الربحي", en: "Advanced Programme: Non-Profit Sector Skills" }, o: { ar: "مؤسسة محمد بن سلمان (مسك) · تخصص إدارة المشاريع التنموية", en: "Mohammed bin Salman Foundation (Misk) · Development Project Management" }, y: "2025" }
    ],
    certifications: [
      { t: "SFC — Scrum Fundamentals Certified", o: { ar: "مبادئ وإطار سكروم لإدارة المشاريع الرشيقة", en: "Core principles of Scrum for Agile project management" } },
      { t: "SAC — Scrum & AI Certified", o: { ar: "دمج الذكاء الاصطناعي مع منهجيات سكروم", en: "Integrating AI with Scrum methodologies" } }
    ],
    courses: [
      { t: "Elements of AI for Business", o: "University of Helsinki & MinnaLearn" },
      { t: { ar: "تطوير ألعاب متقدم بـ Unity، أنميشن وفن رقمي", en: "Advanced Unity Game Development, Animation & Digital Art" }, o: { ar: "جمعية صناع — هاكاثون صناع المستقبل", en: "Sonaa Association — Mega Future Hackathon" } },
      { t: { ar: "تصميم تجربة وواجهة المستخدم · المنتجات الرقمية والابتكار", en: "UX/UI Design · Digital Products & Innovation" }, o: { ar: "مسرّعة مهارات", en: "Maharat Accelerator" } },
      { t: { ar: "إدارة المنتجات الرقمية", en: "Digital Product Management" }, o: { ar: "دروب", en: "Doroob" } },
      { t: { ar: "برمجة الويب بـ JavaScript", en: "Web Development: JavaScript" }, o: { ar: "سطر", en: "Satr" } },
      { t: { ar: "تدريب المدربين والتدريب عن بُعد", en: "Train the Trainer & Remote Training" }, o: { ar: "هدف", en: "Hadaf" } },
      { t: { ar: "تعلّم الآلة وأتمتة العمليات (n8n)", en: "Machine Learning & Automation (n8n)" }, o: { ar: "تعلّم ذاتي", en: "Self-directed" } }
    ],
    skills: [
      { g: { ar: "إدارة المشاريع والمنتج", en: "Project & Product Management" }, items: { ar: ["من الفكرة إلى الإطلاق", "Agile / Scrum", "Logframe", "Gantt", "SOW", "POC", "تحليل أصحاب المصلحة", "تحليل الاحتياج", "التفكير التصميمي", "تصميم العمليات"], en: ["Concept to deployment", "Agile / Scrum", "Logframe", "Gantt", "SOW", "POC", "Stakeholder analysis", "Needs assessment", "Design thinking", "Process design"] } },
      { g: { ar: "التقنية والذكاء الاصطناعي", en: "Technology & AI" }, items: { ar: ["GenAI وهندسة الأوامر", "Python", "JavaScript", "RAG وقواعد البيانات المتجهة", "Swift / SwiftUI", "محركات الألعاب: Unity، GDevelop", "Notion متقدم"], en: ["GenAI & prompt engineering", "Python", "JavaScript", "RAG & vector databases", "Swift / SwiftUI", "Game engines: Unity, GDevelop", "Notion (advanced)"] } },
      { g: { ar: "التصميم والإنتاج الإبداعي", en: "Design & Creative Production" }, items: { ar: ["الهوية البصرية", "عروض تقديمية احترافية", "تصميم جرافيك ومطبوعات", "تصوير ومونتاج فيديو", "تعليق صوتي متعدد اللغات", "التصميم التعليمي"], en: ["Visual branding", "Professional presentation design", "Graphic & print design", "Photography & video editing", "Multilingual voice-over", "Instructional design"] } },
      { g: { ar: "القيادة وإدارة الفعاليات", en: "Leadership & Events" }, items: { ar: ["قيادة الفرق", "تنظيم وإدارة الفعاليات", "الخطابة والإقناع", "الذكاء العاطفي", "العمل تحت الضغط"], en: ["Team leadership", "Event planning & management", "Public speaking & persuasion", "Emotional intelligence", "Performance under pressure"] } }
    ],
    languages: [
      { l: { ar: "العربية", en: "Arabic" }, v: { ar: "اللغة الأم", en: "Native" }, n: 5 },
      { l: { ar: "الإنجليزية", en: "English" }, v: { ar: "متقدم", en: "Advanced" }, n: 4 },
      { l: { ar: "اليابانية", en: "Japanese" }, v: { ar: "مبتدئ", en: "Beginner" }, n: 2 },
      { l: { ar: "الصينية", en: "Chinese" }, v: { ar: "مبتدئ", en: "Beginner" }, n: 1 }
    ]
  },

  /* Zones of the Explorer World map */
  zones: [
    { id: "about", pos: [718, 345], icon: "home", place: { ar: "البلدة", en: "The Town" }, section: { ar: "نبذة عني", en: "About Me" }, q: { ar: "من هي رزان؟", en: "Who is Razan?" }, href: "index.html#about" },
    { id: "experience", pos: [1080, 392], icon: "compass", place: { ar: "المرصد", en: "The Observatory" }, section: { ar: "الخبرات", en: "Experience" }, q: { ar: "أين كانت رحلتها؟", en: "Where has she been?" }, href: "index.html#experience" },
    { id: "projects", pos: [905, 228], icon: "grid", place: { ar: "حيّ الابتكار", en: "Innovation District" }, section: { ar: "المشاريع", en: "Projects" }, q: { ar: "ماذا تستطيع أن تنجز؟", en: "What can she build?" }, href: "index.html#projects" },
    { id: "achievements", pos: [1300, 190], icon: "trophy", place: { ar: "القلعة", en: "The Castle" }, section: { ar: "الإنجازات", en: "Achievements" }, q: { ar: "ماذا حققت؟", en: "What has she achieved?" }, href: "index.html#achievements" },
    { id: "library", pos: [1432, 300], icon: "book", place: { ar: "المكتبة", en: "The Library" }, section: { ar: "المعرفة", en: "Knowledge" }, q: { ar: "ما أساس معرفتها؟", en: "What grounds her knowledge?" }, href: "index.html#library" },
    { id: "workshop", pos: [1505, 478], icon: "gear", place: { ar: "الورشة", en: "The Workshop" }, section: { ar: "التجارب", en: "Experiments" }, q: { ar: "كيف تفكر وتجرّب؟", en: "How does she experiment?" }, href: "index.html#projects" },
    { id: "contact", pos: [1412, 512], icon: "mail", place: { ar: "البوابة", en: "The Gateway" }, section: { ar: "تواصل", en: "Contact" }, q: { ar: "كيف نعمل معًا؟", en: "How do we work together?" }, href: "index.html#contact" }
  ],

  workshop: ["rafiq", "sorting-hat", "learning-journey", "ewc-game", "guardian-of-vision"],

  ui: {
    nav: { home: { ar: "الرئيسية", en: "Home" }, about: { ar: "نبذة", en: "About" }, projects: { ar: "المشاريع", en: "Projects" }, experience: { ar: "الخبرات", en: "Experience" }, achievements: { ar: "الإنجازات", en: "Achievements" }, library: { ar: "المكتبة", en: "Library" }, contact: { ar: "تواصل", en: "Contact" } },
    explore: { ar: "استكشف عالمي", en: "Explore My World" },
    proView: { ar: "العرض المهني", en: "Professional View" },
    cv: { ar: "تحميل السيرة", en: "Download CV" },
    viewWork: { ar: "تصفّح أعمالي", en: "View my work" },
    sel: { ar: "مشاريع مختارة", en: "Selected Projects" },
    selSub: { ar: "كل مشروع دراسة حالة: التحدي، دوري، المنهج، والنتيجة.", en: "Each project is a case study: the challenge, my role, the approach and the outcome." },
    allProjects: { ar: "كل الأعمال", en: "All Work" },
    caseStudy: { ar: "دراسة الحالة", en: "Read case study" },
    aboutT: { ar: "نبذة عني", en: "About Me" },
    expT: { ar: "الرحلة المهنية", en: "Experience" },
    achT: { ar: "سجل الإنجازات", en: "Achievements" },
    libT: { ar: "المكتبة", en: "The Library" },
    libSub: { ar: "التعليم، الشهادات، الدورات، والمهارات.", en: "Education, certifications, courses and skills." },
    edu: { ar: "التعليم", en: "Education" }, certs: { ar: "الشهادات", en: "Certifications" }, courses: { ar: "الدورات", en: "Courses & Training" }, skills: { ar: "المهارات", en: "Skills" }, langs: { ar: "اللغات", en: "Languages" }, interests: { ar: "اهتماماتي", en: "Interests" },
    contactT: { ar: "لنصنع شيئًا استثنائيًا معًا", en: "Let’s build something extraordinary together" },
    contactSub: { ar: "متاحة للفرص في إدارة المشاريع، المنتجات الرقمية، والابتكار.", en: "Open to opportunities in project management, digital products and innovation." },
    email: { ar: "البريد", en: "Email" },
    overview: { ar: "نظرة عامة", en: "Overview" }, challenge: { ar: "التحدي", en: "The Challenge" }, myRole: { ar: "دوري", en: "My Role" }, approach: { ar: "المنهج", en: "My Approach" }, solution: { ar: "الحل", en: "The Solution" }, outcome: { ar: "النتيجة", en: "The Outcome" }, tools: { ar: "الأدوات", en: "Tools" }, links: { ar: "روابط", en: "Links" }, context: { ar: "السياق", en: "Context" },
    back: { ar: "كل المشاريع", en: "All projects" }, next: { ar: "المشروع التالي", en: "Next project" },
    worldTitle: { ar: "عالم رزان", en: "Razan’s World" },
    worldHint: { ar: "اضغط على أي مكان لتكتشفه. اسحب للتنقل.", en: "Select any place to explore it. Drag to look around." },
    open: { ar: "افتح القسم", en: "Open section" },
    nowBuilding: { ar: "أعمل عليه الآن", en: "Now building" },
    close: { ar: "إغلاق", en: "Close" },
    places: { ar: "الأماكن", en: "Places" },
    seeProject: { ar: "عرض المشروع", en: "View project" }
  }
};
