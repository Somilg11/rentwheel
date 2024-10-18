import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "Amazing service! The car was in excellent condition, and the whole process was seamless. Will definitely rent again!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Lee",
    review: "Great car options at affordable prices. The pickup and drop-off process was quick and easy.",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Smith",
    review: "Loved the Tesla Model 3 I rented. Very smooth experience from start to finish.",
    rating: 5,
  },
  {
    id: 4,
    name: "Jessica Brown",
    review: "Good service, though the car could have been cleaner. Overall, I’m satisfied.",
    rating: 3,
  },
  {
    id: 5,
    name: "David Clark",
    review: "Excellent customer support and fantastic vehicles! Highly recommended.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>

        {/* Fading effect on both sides */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10"></div>

        {/* First Testimonial Cards Section (scrolls left) */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-4 testimonial-scroll-left">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div key={index} className="w-[250px] flex-shrink-0">
                <TestimonialCard
                  name={testimonial.name}
                  review={testimonial.review}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Testimonial Cards Section (scrolls right) */}
        <div className="relative overflow-hidden mt-8">
          <div className="flex space-x-4 testimonial-scroll-right">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div key={index} className="w-[250px] flex-shrink-0">
                <TestimonialCard
                  name={testimonial.name}
                  review={testimonial.review}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line react/prop-types
function TestimonialCard({ name, review, rating }) {
  return (
    <Card className="p-4 bg-white rounded-lg shadow-lg overflow-hidden h-[160px] flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 pt-[-10px] line-clamp-2 text-center">{review}</p>
        <div className="flex justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
