export interface Project {
  title: string;
  subtitle: string;
  description: string;
  achievements: string[];
  technologies: string[];
  githubUrl: string;
  hostedUrl?: string;
  date: string;
  category: "backend" | "fullstack" | "bigdata";
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  skills: string[];
  highlights: string[];
}

export interface Education {
  degree: string;
  university: string;
  period: string;
  gpa: string;
  coursework: string[];
  achievements: string[];
}

export interface ResumeData {
  name: string;
  role: string;
  headline: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  skills: {
    category: string;
    items: { name: string; proficiency: number }[];
  }[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  achievements: {
    title: string;
    description: string;
    date: string;
  }[];
}

export const resumeData: ResumeData = {
  name: "Harsh Patel",
  role: "Backend & Systems Engineer",
  headline: "B.Tech Computer Science student building high-performance APIs, database schemas, and scalable data pipelines.",
  summary: "Motivated and detail-oriented Software Engineer specializing in backend development, seeking to contribute to scalable, production-grade systems. Proficient in ASP.NET Core, C#, Entity Framework Core, PostgreSQL, SQL Server, and MongoDB, with hands-on experience designing RESTful APIs, implementing JWT-based authentication, and managing relational and non-relational databases. Committed to daily discipline and a continuous growth mindset, practicing algorithmic problem solving on LeetCode to improve 1% better each day.",
  email: "hp22022005@gmail.com",
  github: "https://github.com/Harsh-Patel-22",
  linkedin: "https://linkedin.com/in/harsh-patel-31ab6b2a2/",
  leetcode: "https://leetcode.com/u/Harsh-Patel-22",
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "C#", proficiency: 95 },
        { name: "Python", proficiency: 85 },
        { name: "SQL", proficiency: 80 },
        { name: "TypeScript", proficiency: 70 },
      ]
    },
    {
      category: "Backend Architecture",
      items: [
        { name: "ASP.NET Core Web API", proficiency: 95 },
        { name: "ASP.NET MVC", proficiency: 85 },
        { name: "Entity Framework Core", proficiency: 90 },
        { name: "LINQ", proficiency: 80 },
        { name: "Flask", proficiency: 80 },
        { name: "FastAPI", proficiency: 70 }
      ]
    },
    {
      category: "Databases & Caching",
      items: [
        { name: "PostgreSQL", proficiency: 88 },
        { name: "SQL Server (SSMS)", proficiency: 90 },
        { name: "MongoDB", proficiency: 80 },
        { name: "Redis", proficiency: 70 }
      ]
    },
    {
      category: "Big Data & Engineering",
      items: [
        { name: "Apache Spark", proficiency: 75 },
        { name: "Apache Hadoop", proficiency: 70 },
        { name: "RESTful API Design", proficiency: 92 },
        { name: "JWT Authentication", proficiency: 80 }
      ]
    },
    {
      category: "DevOps & Tools",
      items: [
        { name: "Docker", proficiency: 80 },
        { name: "GCP (Google Cloud)", proficiency: 75 },
        { name: "Vercel", proficiency: 90 },
        { name: "Git & GitHub", proficiency: 80 },
      ]
    }
  ],
  projects: [
    {
      title: "JSeeker",
      subtitle: "Locality-First Professional Networking & Hiring Platform",
      description: "A location-aware professional networking and hiring ecosystem designed to connect job seekers and hirers within a defined geographic radius, reducing hiring friction. Deployed on Google Cloud Platform.",
      achievements: [
        "Architected the complete backend APIs in C# using ASP.NET Core Web API, Entity Framework Core, and SQL Server.",
        "Integrated interactive Leaflet maps enabling location-aware radius queries to discover nearby businesses and candidates.",
        "Designed automated GitHub intelligence modules to scrape repository details and evaluate skill markers.",
        "Created background processors for dynamic resume generation and automated candidate rating profiles.",
        "Built structured workflow pipelines to manage job applications from submission to interview logs and final hire state.",
        "Deployed the production build on Google Cloud Platform (GCP) with proper reverse proxy and secure VPC networking."
      ],
      technologies: ["C#", "ASP.NET Core Web API", "SQL Server", "EF Core", "Leaflet Maps", "GCP", "MVC", "Authentication"],
      githubUrl: "https://github.com/Harsh-Patel-22/JSeeker",
      hostedUrl: "https://jseeker.run.place", 
      date: "Jun 2025 - Jan 2026",
      category: "fullstack"
    }
  ],
  experience: [
    {
      role: "Student Intern",
      company: "Navrachana University",
      period: "Jan 2026 - Present",
      skills: ["Python", "Excel", "Data Science", "Academic Management"],
      highlights: [
        "Assisting course faculty in conducting and managing the academic curriculum for the Data Science specialization.",
        "Leading lab sessions demonstrating scientific data libraries including Pandas, NumPy, and Scikit-Learn to peers.",
        "Structuring and grading practical assignments, ensuring high student comprehension and concept retention."
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech. in Computer Science & Engineering",
      university: "Navrachana University",
      period: "2023 - 2027",
      gpa: "9.24 / 10",
      coursework: [
        "Design and Analysis of Algorithms",
        "Database Management Systems (RDBMS)",
        "Operating Systems & Linux Shell",
        "Object-Oriented Programming (OOPs)",
        "Data Warehousing & Data Mining"
      ],
      achievements: [
        "Maintained top 5% batch ranking with a cumulative GPA of 9.24/10.",
        "Active member of the University Technical and Hackathon committee.",
        "Conducted multiple student workshops introducing Git, GitHub and backend API conventions."
      ]
    }
  ],
  achievements: [
    {
      title: "Active LeetCode Algorithmic Problem Solver",
      description: "Solved over 300+ medium/hard algorithmic challenges on LeetCode focusing on dynamic programming, graph algorithms, and system design layouts.",
      date: "Ongoing"
    },
    {
      title: "GCP Cloud Infrastructure Deployment",
      description: "Architected and deployed production-ready services onto GCP Compute Engines utilizing modern containerization and secure VPC setups.",
      date: "Jan 2026"
    },
    {
      title: "Top Performer in CSE Academic Cohort",
      description: "Recognized by University faculty for outstanding performance in core computer science subjects, including Algorithms and Databases.",
      date: "Dec 2025"
    }
  ]
};
