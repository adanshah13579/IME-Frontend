import Searcher from "./components/Searcher";
import IMECard from "./components/IMECard";

const IMEs = [
  {
    title: "IME Title",
    category: "IME Category",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
  },
  {
    title: "IME Title",
    category: "IME Category",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
  },
  {
    title: "IME Title",
    category: "IME Category",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
  },
];

export default function DoctorSearchPage() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-2 px-4 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
        <div className="max-w-screen mb-8 lg:mb-10">
          <Searcher />
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
          {IMEs.map((ime, index) => (
            <IMECard key={index} {...ime} />
          ))}
        </div>
      </div>
    </section>
  );
}
