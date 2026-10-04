"use client";

import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import type { ServiceDocument, ServiceStep } from "@/types/service";

interface ServiceChecklistProps {
  serviceSlug: string;
  documents: ServiceDocument[];
  steps: ServiceStep[];
}

export function ServiceChecklist({
  serviceSlug,
  documents,
  steps,
}: ServiceChecklistProps) {
  // مفتاح التخزين الخاص بهذه الخدمة تحديداً
  const storageKey = `masar_checklist_${serviceSlug}`;

  // مصفوفة تحتوي على معرّفات (IDs) العناصر المكتملة
  const [completedIds, setCompletedIds] = useLocalStorage<string[]>(
    storageKey,
    [],
  );

  // إجمالي عدد العناصر المتاحة (مستندات + خطوات)
  const totalItems = documents.length + steps.length;

  // لحساب العناصر المكتملة الموجودة بالفعل ضمن هذه الخدمة
  const completedCount = completedIds.length;
  const progressPercentage =
    totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // تبديل حالة العنصر (تحديد / إلغاء تحديد)
  const toggleItem = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // إعادة ضبط القائمة كلياً
  const resetChecklist = () => {
    if (completedCount === 0) return;
    setCompletedIds([]);
  };

  return (
    <section
      aria-label="قائمة تفقُّد تحضير الخدمة"
      className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      {/* الهيدر وشريط التقدم */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              قائمة تفقُّد التحضير
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              علم على الأوراق والخطوات اللي خلصتها عشان تتابع تجهيزك للإجراء
            </p>
          </div>

          {completedCount > 0 && (
            <button
              type="button"
              onClick={resetChecklist}
              className="rounded px-2 py-1 text-xs font-medium text-destructive hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              إعادة ضبط القائمة
            </button>
          )}
        </div>

        {/* شريط نسبة الإنجاز */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-foreground">
            <span>نسبة الجاهزية</span>
            <span>
              {completedCount} من {totalItems} مكتمل ({progressPercentage}%)
            </span>
          </div>

          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="نسبة مكتملات القائمة"
          >
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* قسم المستندات المطلوبة */}
      {documents.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="border-b border-border/60 pb-2 text-base font-semibold text-foreground">
            المستندات المطلوبة ({documents.length})
          </h3>
          <ul className="space-y-2.5" role="list">
            {documents.map((doc, index) => {
              const docId = `doc-${index}`;
              const isChecked = completedIds.includes(docId);
              return (
                <li key={docId}>
                  <label className="flex cursor-pointer select-none items-start gap-3 rounded-lg border border-border/60 p-3 transition-colors hover:bg-accent/40">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(docId)}
                      className="mt-1 h-4 w-4 cursor-pointer rounded border-input text-primary accent-primary focus:ring-ring"
                    />
                    <div className="space-y-0.5">
                      <span
                        className={`block text-sm font-medium ${
                          isChecked
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        }`}
                      >
                        {doc.name}
                      </span>
                      {doc.description && (
                        <p className="text-xs text-muted-foreground">
                          {doc.description}
                        </p>
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* قسم خطوات الإجراء */}
      {steps.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="border-b border-border/60 pb-2 text-base font-semibold text-foreground">
            خطوات الإجراء ({steps.length})
          </h3>
          <ol className="space-y-2.5" role="list">
            {steps.map((step) => {
              const stepId = `step-${step.order}`;
              const isChecked = completedIds.includes(stepId);
              return (
                <li key={stepId}>
                  <label className="flex cursor-pointer select-none items-start gap-3 rounded-lg border border-border/60 p-3 transition-colors hover:bg-accent/40">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(stepId)}
                      className="mt-1 h-4 w-4 cursor-pointer rounded border-input text-primary accent-primary focus:ring-ring"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
                          {step.order}
                        </span>
                        {step.title && (
                          <span
                            className={`text-sm font-medium ${
                              isChecked
                                ? "text-muted-foreground line-through"
                                : "text-foreground"
                            }`}
                          >
                            {step.title}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs ${
                          isChecked
                            ? "text-muted-foreground line-through"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}
