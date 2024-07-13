
const CustomerTestimonials = () => {
  const testimonials = [
    {
      customerName: "John Doe",
      feedback:
        "This company provided excellent service and I couldn’t be happier with the results!",
    },
    {
      customerName: "Jane Smith",
      feedback:
        "Highly professional team and outstanding customer support. Highly recommend!",
    },
    {
      customerName: "Mike Johnson",
      feedback:
        "Their attention to detail and commitment to quality is second to none.",
    },
  ];
  return (
    <div>
      <div>
        <h2>What Our Customers Say</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <p>
              <strong>{testimonial.customerName}</strong>:{" "}
              {testimonial.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTestimonials;
