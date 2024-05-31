import React from 'react';
import SectionHeading from './SectionHeading.tsx';
import Testimonialsslider from './Testimonialsslider.tsx';

const Testimonials: React.FC = () => {
  return (
    <div className="pt-20 pb-16" style={{
      background: 'radial-gradient(circle 500px at left top, rgba(35, 121, 171, 0.5), transparent), radial-gradient(circle 500px at right bottom, rgba(35, 121, 171, 0.5), transparent), #0C0C2E',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
        <SectionHeading heading="Testimonials" />
        <div className="w-4/5 mt-16 mx-auto"></div>
        <Testimonialsslider />
    </div>
  );
}

export default Testimonials;
