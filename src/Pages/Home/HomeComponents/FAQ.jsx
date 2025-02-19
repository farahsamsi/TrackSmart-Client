import SectionTitle from "../../../SharedComponents/SectionTitle";

const FAQ = () => {
  const faqs = [
    {
      question: "What is TrackSmart?",
      answer:
        "TrackSmart is an asset management system designed to help businesses efficiently track, categorize, and manage company assets. It provides role-based access for HR managers and employees, ensuring smooth operations.",
    },
    {
      question: "Who can use TrackSmart?",
      answer:
        "TrackSmart is designed for businesses of all sizes. HR managers can oversee asset allocation, while employees can request and manage assets seamlessly.",
    },
    {
      question: "How does asset categorization work?",
      answer:
        "Assets are classified into two categories:\n✅ Returnable Assets – Items like laptops and office desks that employees must return after use.\n✅ Non-Returnable Assets – Consumable items like pens and tissue paper that do not require returns.",
    },
    {
      question: "Is TrackSmart mobile-friendly?",
      answer:
        "Yes! TrackSmart is fully responsive, allowing you to manage assets on any device, whether desktop, tablet, or mobile.",
    },
    {
      question: "How secure is TrackSmart?",
      answer:
        "TrackSmart uses JWT authentication for secure login and data protection. User roles ensure that only authorized personnel can access specific features.",
    },
    {
      question: "Can I upgrade my HR account?",
      answer:
        "Yes! HR managers can upgrade their accounts to manage more employees by selecting a package and making a secure online payment.",
    },
    {
      question: "Does TrackSmart support notifications?",
      answer:
        "Yes! Users receive real-time notifications via sweet alerts and toast messages for actions like asset requests, approvals, and returns.",
    },
    {
      question: "Can I search and filter assets?",
      answer:
        "Absolutely! TrackSmart offers advanced search and filtering options to quickly find assets based on category, availability, or other criteria.",
    },
    {
      question: "What if I need help?",
      answer:
        "If you have any issues or questions, feel free to contact our support team through the provided help section in TrackSmart.",
    },
    {
      question: "Still have questions?",
      answer: "Reach out to us anytime! 🚀",
    },
  ];

  return (
    <section className="pb-12">
      <SectionTitle heading="Frequently Asked Questions (FAQ)"></SectionTitle>
      <div className="space-y-4 px-4">
        {faqs?.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
