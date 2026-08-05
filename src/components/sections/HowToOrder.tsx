import { Container } from '@/components/ui/Section';
import { L } from '@/i18n/Localized';

/**
 * Three steps, numbered because ordering genuinely is a sequence.
 *
 * Written for someone who has never bought anything online: it says plainly
 * that WhatsApp opens and must be sent, that payment is cash at the door, and
 * that a person will call to confirm — the three things that otherwise make a
 * first-time shopper abandon the cart.
 */
const steps = [
  {
    title: { en: 'Pick your products', ar: 'اختر منتجاتك' },
    body: {
      en: 'Tap “Add to cart” on anything you want. You can change the amount later.',
      ar: 'اضغط «أضف إلى السلة» على ما تريد. يمكنك تغيير الكمية لاحقًا.',
    },
  },
  {
    title: { en: 'Send your order on WhatsApp', ar: 'أرسل طلبك عبر واتساب' },
    body: {
      en: 'Fill in your name, phone and address. WhatsApp opens with your order written out — press Send.',
      ar: 'اكتب اسمك ورقم هاتفك وعنوانك. سيفتح واتساب وطلبك مكتوب بالفعل — اضغط إرسال.',
    },
  },
  {
    title: { en: 'We call you, then deliver', ar: 'نتصل بك ثم نوصّل الطلب' },
    body: {
      en: 'Someone rings within 15–30 minutes to confirm. Pay cash when the order reaches your door.',
      ar: 'سيتصل بك أحد أفراد الفريق خلال 15–30 دقيقة للتأكيد. وتدفع نقدًا عند وصول الطلب إلى باب بيتك.',
    },
  },
];

export function HowToOrder() {
  return (
    <section className="section-tight">
      <Container>
        <h2 className="text-center text-display-sm sm:text-display-md">
          <L text={{ en: 'How to order', ar: 'كيف تطلب' }} />
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-ink-soft">
          <L
            text={{
              en: 'No account, no card, no app to install.',
              ar: 'بدون حساب، وبدون بطاقة، وبدون تطبيق تُثبّته.',
            }}
          />
        </p>

        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title.en} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-800 text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                <L text={s.title} />
              </h3>
              <p className="mt-2 text-ink-soft">
                <L text={s.body} />
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
