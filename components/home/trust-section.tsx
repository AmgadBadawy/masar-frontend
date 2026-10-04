export function TrustSection() {
  const trustPoints = [
    {
      number: "01",
      title: "معلومات مرتبة",
      description: "نوضح لك ما تحتاج معرفته قبل أن تبدأ الإجراء.",
    },
    {
      number: "02",
      title: "مصدر رسمي",
      description: "نوصلك إلى الجهة والمصدر الرسمي عند توفر المعلومات الموثقة.",
    },
    {
      number: "03",
      title: "تاريخ آخر مراجعة",
      description: "نوضح متى تم التحقق من المعلومات المتاحة لدينا.",
    },
  ];

  return (
    <section
      aria-labelledby="trust-heading"
      dir="rtl"
      // استخدام خلفية تتناسق مع الفوتر الفاتح
      className="border-b border-white/50 bg-[#F6FAF9]"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <header className="lg:col-span-5">
            <p className="text-sm font-bold text-[#0E5F63]">لماذا مسار؟</p>

            <h2
              id="trust-heading"
              className="mt-3 max-w-[480px] text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-[#06292B]"
            >
              اعرف الطريق قبل أن تبدأ
            </h2>
          </header>

          <div className="lg:col-span-7">
            <p className="max-w-[650px] text-lg font-medium leading-8 text-[#06292B]/85">
              مسار منصة إرشادية وليست جهة حكومية. ننظم المعلومات المنشورة ونوصلك
              إلى الجهة والمصدر الرسمي للخدمة.
            </p>

            <div className="mt-10 border-t border-[#0E5F63]/10">
              <div className="grid gap-0 sm:grid-cols-3">
                {trustPoints.map((point) => (
                  <div
                    key={point.number}
                    className="border-b border-[#0E5F63]/10 py-6 last:border-b-0 sm:border-b-0 sm:border-l sm:px-5 sm:first:pr-0 sm:last:border-l-0 sm:last:pl-0"
                  >
                    {/* تعديل لون الأرقام ليظهر بوضوح ويتناسق مع الهوية */}
                    <span className="text-sm font-extrabold tabular-nums text-[#0E5F63]/60">
                      {point.number}
                    </span>

                    <h3 className="mt-3 text-base font-bold text-[#06292B]">
                      {point.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-[#06292B]/75">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
