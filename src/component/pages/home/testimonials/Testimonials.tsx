import { FC } from "react";

// Define the Testimonial interface
interface Testimonial {
  id: number;
  content: string;
  avatar: string;
  name: string;
  designation: string;
}

// Testimonial data relevant to BikeStore
const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "They are customer friendly and well behaved and most importantly very good service, they provided my bike registration and other documents within a short period of time. I hope their service should remain the same in future.",
    avatar:
      "https://res.cloudinary.com/dfgyejofj/image/upload/v1746211661/wnost3n5ic0crc1drci8.jpg",
    name: "Faisal Kabir",
    designation: "Executive of Finance and Procurement",
  },
  {
    id: 2,
    content:
      "Very nice behaviour. Highly recommended if you want to buy Suzuki Motorcycles. Also, they got me a nice number with very fast processing. Really satisfied with their service.",
    avatar:
      "https://res.cloudinary.com/dfgyejofj/image/upload/v1746211662/wtrlajta4gfyrgvim6ec.jpg",
    name: "Mahathir Jeshan ",
    designation: "Student |Bike Enthusiast",
  },
];

// Reusable component for individual testimonial item
const TestimonialItem: FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="p-6 bg-neutral-200/65 rounded-lg md:p-8">
    <p className="leading-loose text-neutral-500">“{testimonial.content}”</p>
    <div className="flex items-center mt-6">
      <img
        className="object-cover rounded-full w-14 h-14"
        src={testimonial.avatar}
        alt={testimonial.name}
      />
      <div className="mx-4">
        <h1 className="font-semibold text-neutral-800">{testimonial.name}</h1>
        <span className="text-sm text-gray-500">{testimonial.designation}</span>
      </div>
    </div>
  </div>
);

// Main Testimonials component
const Testimonials: FC = () => {
  return (
    <section className="">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800/85 capitalize lg:text-3xl">
          What our <span className="text-neutral-950 font-bold">clients</span>{" "}
          say about us
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500">
          At Suzuki Riders Zone, our customers' satisfaction is our top
          priority. Discover why riders trust us for their biking adventures.
        </p>
        <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
          {testimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
