/**
 * ARISE PUBLIC SCHOOL - Central Data & Authentic Configuration
 * Featuring all 5 real campus photographs provided by the user.
 * 
 * Official Contact Numbers: 9507706767, 7292954133, 8789225706, 8210786625
 * Official Email: arisepublicschoolrupsagar@gmail.com
 * Location: Nawanagar Budhaila Road, Rupsagar (Buxar)
 * Tagline: "Teaching is our Passion & your child is our Priority"
 * Curriculum: Based on CBSE Curriculum (English Medium)
 */

const ARISE_CONFIG = {
  schoolInfo: {
    name: "ARISE PUBLIC SCHOOL",
    locationShort: "RUPSAGAR (BUXAR)",
    tagline: "Teaching is our Passion & your child is our Priority",
    motto: "Building strong foundations through knowledge, creativity, discipline and values.",
    inaugurationDate: "26 January 2026",
    classes: "Nursery to Class VIII",
    session: "2026–2027",
    medium: "English Medium",
    curriculum: "Based on CBSE Curriculum",
    location: {
      addressLine1: "Nawanagar Budhaila Road",
      addressLine2: "Rupsagar, Buxar",
      district: "Buxar",
      state: "Bihar",
      fullAddress: "Nawanagar Budhaila Road, Rupsagar, Buxar, Bihar"
    },
    contact: {
      phone: "+91 9507706767",
      altPhone1: "+91 7292954133",
      altPhone2: "+91 8789225706",
      altPhone3: "+91 8210786625",
      phoneList: ["9507706767", "7292954133", "8789225706", "8210786625"],
      email: "arisepublicschoolrupsagar@gmail.com",
      admissionsEmail: "arisepublicschoolrupsagar@gmail.com",
      officeHours: "Monday to Saturday: 8:00 AM – 2:00 PM"
    }
  },

  academicWings: [
    {
      id: "pre-primary",
      title: "Pre-Primary Wing",
      grades: "Nursery, LKG, UKG",
      ageGroup: "3 – 6 Years",
      icon: "fa-baby",
      color: "from-blue-500 to-cyan-500",
      description: "Nurturing early childhood development through play-based learning, sensory activities, language skills, and foundational social habits in English Medium."
    },
    {
      id: "primary",
      title: "Primary Wing",
      grades: "Class I to Class V",
      ageGroup: "6 – 11 Years",
      icon: "fa-book-open",
      color: "from-indigo-500 to-purple-500",
      description: "Building strong conceptual understanding in Mathematics, Science, English, Hindi, and Social Studies based on CBSE curriculum guidelines."
    },
    {
      id: "middle",
      title: "Middle School Wing",
      grades: "Class VI to Class VIII",
      ageGroup: "11 – 14 Years",
      icon: "fa-graduation-cap",
      color: "from-red-500 to-rose-500",
      description: "Developing analytical reasoning, scientific curiosity, digital literacy, leadership qualities, and sound moral values for higher academic challenges."
    }
  ],

  approachPillars: [
    {
      title: "CBSE Aligned Curriculum",
      desc: "Structured English Medium curriculum designed to meet modern educational standards and CBSE learning outcomes.",
      icon: "fa-award"
    },
    {
      title: "Dedicated Faculty",
      desc: "Passionate teachers dedicated to providing personalized attention, fostering academic excellence and character.",
      icon: "fa-chalkboard-user"
    },
    {
      title: "Strong Foundations",
      desc: "Focus on fundamental reading, writing, mathematical clarity, and interactive activity-oriented learning.",
      icon: "fa-building-columns"
    },
    {
      title: "Values & Discipline",
      desc: "Instilling moral integrity, mutual respect, discipline, and patriotic values starting from Nursery level.",
      icon: "fa-hands-holding-heart"
    }
  ],

  campusLife: [
    {
      category: "Campus Architecture",
      title: "Spacious School Building & Ground",
      desc: "Wide open playground lawn in front of the modern classroom building.",
      image: "assets/images/school-building-front.jpg"
    },
    {
      category: "Classroom Wing",
      title: "Ventilated Classrooms & Corridor",
      desc: "Clean classroom wing surrounded by fresh greenery and garden plants.",
      image: "assets/images/school-corridor-garden.jpg"
    },
    {
      category: "Events & Gallery",
      title: "Activity & Event Wall Display",
      desc: "Covered hallway displaying photos of student celebrations, achievements, and programs.",
      image: "assets/images/school-hallway-gallery.jpg"
    },
    {
      category: "Main Entrance",
      title: "Decorated Entrance & Administrative Desk",
      desc: "Welcoming main doorway adorned with marigold garlands and official Arise signboard.",
      image: "assets/images/school-building-doorway.jpg"
    },
    {
      category: "School Gate",
      title: "Grand Entrance Arch & Banners",
      desc: "Main entrance arch on Nawanagar Budhaila Road featuring inauguration & admission banners.",
      image: "assets/images/school-entrance-arch.jpg"
    }
  ],

  newsAndEvents: [
    {
      id: 1,
      type: "Official Notice",
      badgeClass: "badge-coral",
      title: "Admissions Open for Academic Session 2026–2027",
      date: "Session 2026–27",
      summary: "Admissions open for Nursery to Class VIII (English Medium - CBSE Curriculum). Collect registration forms at the school office or submit an online enquiry.",
      details: "Parents are invited to visit Arise Public School campus on Nawanagar Budhaila Road, Rupsagar, Buxar or contact 9507706767, 7292954133, 8789225706, 8210786625."
    },
    {
      id: 2,
      type: "Special Milestone",
      badgeClass: "badge-navy",
      title: "Grand Inauguration Programme",
      date: "26 January 2026",
      summary: "Celebrating the auspicious inauguration of Arise Public School, Rupsagar on Republic Day 2026.",
      details: "A historic day marking the formal opening of Arise Public School at Nawanagar Budhaila Road, Rupsagar, Buxar."
    },
    {
      id: 3,
      type: "Curriculum Highlight",
      badgeClass: "badge-gold",
      title: "English Medium Education Based on CBSE Pattern",
      date: "Academic Year 2026–27",
      summary: "Empowering young minds with modern English medium teaching standards, foundational literacy, and value-based discipline.",
      details: "Our dedicated educators ensure every student receives personal care and priority."
    }
  ],

  galleryCategories: ["All", "Campus", "Building", "Events"],

  galleryItems: [
    { id: 1, category: "Campus", title: "Main Entrance Arch & Signboard", desc: "Nawanagar Budhaila Road entrance with inauguration and admission banners", image: "assets/images/school-entrance-arch.jpg" },
    { id: 2, category: "Building", title: "Arise Public School Main Building", desc: "Full view of the white classroom building across wide playground lawn", image: "assets/images/school-building-front.jpg" },
    { id: 3, category: "Building", title: "Classroom Corridor & Garden", desc: "Ventilated classroom wing with surrounding green garden plants", image: "assets/images/school-corridor-garden.jpg" },
    { id: 4, category: "Events", title: "Event Photo Gallery Hallway", desc: "Covered corridor wall showcasing student activity photos", image: "assets/images/school-hallway-gallery.jpg" },
    { id: 5, category: "Building", title: "Decorated Main Doorway", desc: "Main building doorway decorated with marigold garlands and Arise emblem", image: "assets/images/school-building-doorway.jpg" }
  ],

  principalMessage: {
    title: "Leadership Message",
    name: "Management & Academic Desk",
    qualification: "ARISE PUBLIC SCHOOL, RUPSAGAR",
    message: `Welcome to Arise Public School, located on Nawanagar Budhaila Road, Rupsagar (Buxar). Our motto "Teaching is our Passion & your child is our Priority" defines everything we do. We offer English Medium education based on the CBSE pattern from Nursery to Class VIII. We invite all parents to visit our campus or contact us at 9507706767 / arisepublicschoolrupsagar@gmail.com for the 2026–2027 academic admissions.`
  }
};
