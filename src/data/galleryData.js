import photo1 from '../assets/7c4be6e9-51ce-45bf-81e5-b326a5000216.jpg';
import photo2 from '../assets/7dbce2f7-7b5a-45e8-9448-28d4441b097b.jpg';
import photo3 from '../assets/85125e4e-c3f4-493a-adcc-487dee6ac9f7.jpg';
import photo4 from '../assets/92ef2784-dd6b-4127-b579-b876e4cf64a2.jpg';
import photo5 from '../assets/a9664ca0-e7c8-42f9-959e-220284b612da.jpg';
import acmLecture from '../assets/acm-lecture.jpg';
import acmPresentation from '../assets/acm-presentation.jpg';
import acmDsaAudience from '../assets/acm-dsa-audience.jpg';
import acmDsaSeries from '../assets/acm-dsa-series.jpg';
import dsaAcm from '../assets/dsa-acm.jpg';


export const galleryData = [
  {
    id: 1,
    title: "ACM orientation",
    category: "orientation",
    image: photo1, // Use the imported variable here
    description: "Students collaborating during the session."
  },
  {
    id: 2,
    title: "DSA Session",
    category: "Session",
    image: photo2,
    description: "Industry expert guiding members on advanced data structures."
  },
  {
    id: 3,
    title: "DSA Session -1",
    category: "Session",
    image: photo4,
    description: "Students are learning about data structures as well as algorithms."
  },
  {
    id: 4,
    title: "ACM- Core Team",
    category: "Teamwork",
    image: photo3,
    description: "The core team endulged in the acm related work"
  },
  {
    id: 5,
    title: "ACM BV",
    category: "",
    image: photo5,
    description: "ACM X BANASTHALI VIDYAPITH"
  },

  {
  id: 6, 
  title: 'Student Audience & Workshop',
  description: 'Attendees engaging actively during the technical session in the auditorium.',
  category: 'Student Audience & Workshop',
  image: acmLecture, 
},

  {
    id: 7,
    title: 'DSA Series Presentation',
    description: 'Leading the walkthrough session on core algorithmic concepts and problem-solving roadmaps.',
    category: 'DSA Series',
    image: acmPresentation, // or '/images/acm-presentation.jpg' if placed in public/
  },
  {
    id: 8,
    title: 'DSA Series • Audience Engagement',
    description: 'Students attending the interactive lecture session on algorithmic problem solving.',
    category: 'DSA Series',
    image: acmDsaAudience, // or '/images/acm-dsa-audience.jpg' if placed in public/
  },
  {
    id: 9,
    title: 'DSA Series • Speaker Address',
    description: 'Student leads addressing the hall, outlining key milestones and problem-solving strategies for the DSA track.',
    category: 'DSA Series',
    image: acmDsaSeries, // or '/images/acm-dsa-series.jpg' if placed in public/
  },

  {
    id: 10,
    title: 'DSA Series • Session Highlights',
    description: 'A photo montage capturing keynote presentations, student participation, and mentors addressing the hall during the DSA series.',
    category: 'DSA Series',
    image: dsaAcm, // or '/images/dsa-acm.jpg' if placed in public/
  },

];