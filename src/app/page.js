"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Cpu, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Loader2, 
  BarChart3, 
  Network, 
  GitBranch, 
  Terminal, 
  Layers, 
  Database, 
  Code2, 
  Server, 
  LineChart 
} from 'lucide-react';
import SplitText from '@/components/SplitText';
import LogoLoop from '@/components/LogoLoop';

// Custom inline SVG icons for social media (Lucide brand icons are missing in some versions)
function GithubIcon({ size = 20, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 20, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Home() {
  // Navigation Shrink state
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Typewriter state
  const [typedText, setTypedText] = useState('');
  const roles = useMemo(() => [
    "Python Developer",
    "AI & ML Student",
    "Wipro CIO Org Intern",
    "Robotics ML Developer",
    "Data Analyst"
  ], []);

  // Form states
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Refs for custom cursor and spotlight
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);

  // Navigation scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timer = null;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentRole.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      timer = setTimeout(type, typingSpeed);
    };

    timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [roles]);

  // Cursor tracking & spotlight effect
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring || !spotlight) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let isActive = false;
    let animationFrameId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isActive) {
        isActive = true;
        document.body.classList.add('cursor-active');
        spotlight.style.opacity = '1';
      }
    };

    const onMouseOut = (e) => {
      if (e.relatedTarget === null) {
        isActive = false;
        document.body.classList.remove('cursor-active');
        spotlight.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);

    const renderCursor = () => {
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      spotlight.style.left = `${mouseX}px`;
      spotlight.style.top = `${mouseY}px`;

      animationFrameId = requestAnimationFrame(renderCursor);
    };

    animationFrameId = requestAnimationFrame(renderCursor);

    // Interactive Hover Classes
    const setupHoverListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, select, input, textarea, .cursor-hover-expand');
      const handleMouseEnter = () => document.body.classList.add('cursor-hovering');
      const handleMouseLeave = () => document.body.classList.remove('cursor-hovering');

      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        hoverElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    // Need small delay to let DOM render fully
    const cleanupHover = setupHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('cursor-active', 'cursor-hovering');
      cleanupHover();
    };
  }, []);

  // Scroll reveal Observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
    return () => {
      reveals.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Logo Loop data
  const techLogos = useMemo(() => [
    {
      node: (
        <>
          <Terminal className="logo-icon color-python" />
          <span>Python</span>
        </>
      ),
      title: 'Python'
    },
    {
      node: (
        <>
          <Layers className="logo-icon color-pytorch" />
          <span>PyTorch</span>
        </>
      ),
      title: 'PyTorch'
    },
    {
      node: (
        <>
          <Database className="logo-icon" />
          <span>SQL & Databases</span>
        </>
      ),
      title: 'SQL & Databases'
    },
    {
      node: (
        <>
          <Cpu className="logo-icon" />
          <span>Machine Learning</span>
        </>
      ),
      title: 'Machine Learning'
    },
    {
      node: (
        <>
          <GitBranch className="logo-icon" />
          <span>Git / Github</span>
        </>
      ),
      title: 'Git / Github'
    },
    {
      node: (
        <>
          <Code2 className="logo-icon" />
          <span>C++</span>
        </>
      ),
      title: 'C++'
    },
    {
      node: (
        <>
          <Server className="logo-icon" />
          <span>Cloud Systems</span>
        </>
      ),
      title: 'Cloud Systems'
    },
    {
      node: (
        <>
          <Network className="logo-icon" />
          <span>Deep Learning</span>
        </>
      ),
      title: 'Deep Learning'
    },
    {
      node: (
        <>
          <LineChart className="logo-icon" />
          <span>Data Analytics</span>
        </>
      ),
      title: 'Data Analytics'
    }
  ], []);

  // Form submission handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      'form-name': 'sender_name',
      'form-email': 'sender_email',
      'form-subject': 'subject',
      'form-message': 'message'
    };
    setFormData(prev => ({
      ...prev,
      [fieldMap[id]]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    // Simulate API Network latency
    setTimeout(() => {
      setIsSubmitting(false);
      const insertedId = `msg_${Math.random().toString(36).substring(2, 9)}`;
      setStatusMessage({
        type: 'success',
        content: `HTTP/1.1 201 Created
Content-Type: application/json

{
  "status": "success",
  "inserted_id": "${insertedId}",
  "message": "Thank you, ${formData.sender_name}. Your message regarding '${formData.subject}' has been delivered to Tharanika."
}`
      });

      // Reset form data
      setFormData({
        sender_name: '',
        sender_email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <>
      {/* Custom Trailing Cursor */}
      <div ref={dotRef} className="cursor-dot" id="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring" id="cursor-ring"></div>

      {/* Background Grid Pattern */}
      <div className="grid-overlay"></div>
      <div ref={spotlightRef} className="spotlight" id="spotlight"></div>

      {/* Sticky Navigation Bar */}
      <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar">
          <div className="nav-brand">
            <a href="#hero" className="brand-link">Tharanika<span>.</span></a>
          </div>
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#experience" className="nav-link">Experience</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#contact" className="btn btn-sm btn-outline">Hire Me</a>
          </div>
        </nav>
      </header>

      <main className="content-wrapper">
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="badge">
                <Cpu className="badge-icon" />
                <span>AI & ML Developer</span>
              </div>
              <h1 className="hero-title">
                <SplitText
                  text="Developing Intelligence."
                  className="split-text"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  tag="span"
                />
                <br />
                Designing <span className="gradient-text">Data Solutions.</span>
              </h1>
              <h2 className="hero-subtitle">
                Hi, I&apos;m Tharanika T. I&apos;m a <span id="dynamic-text" className="typed-text">{typedText}</span>
              </h2>
              <p className="hero-description">
                An AI & ML Engineer focused on applying analytical thinking and programming skills to build intelligent systems, automate workflows, and develop high-performance models.
              </p>
              <div className="hero-actions">
                <a href="#experience" className="btn btn-primary cursor-hover-expand">
                  Explore Experience <ArrowRight className="btn-icon" />
                </a>
                <a href="#contact" className="btn btn-secondary cursor-hover-expand">Let&apos;s Connect</a>
              </div>
            </div>
          </div>
        </section>

        {/* LogoLoop Section */}
        <section className="logo-loop-section">
          <div className="logo-loop-container" id="tech-logo-loop">
            <LogoLoop 
              logos={techLogos}
              speed={60}
              direction="left"
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              logoHeight={28}
              gap={32}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section scroll-reveal">
          <div className="section-container">
            <div className="section-header">
              <span className="section-label">01 // About Me</span>
              <h2 className="section-title">Bridging Theory and Intelligent </h2>
            </div>
            <div className="about-grid">
              <div className="about-text-column">
                <p className="paragraph-lead">
                  I am an Artificial Intelligence and Machine Learning student with a deep passion for building intelligent, data-driven solutions. My work centers on data preprocessing, predictive modeling, and AI automation.
                </p>
                <p className="paragraph-body">
                  Whether utilizing Python for machine learning tasks, deploying robotics path-planning scripts, or engineering database architectures, I strive for clean execution and optimized performance. I leverage data-driven logic to transform complex challenges into structured, functional pipelines.
                </p>
                <div className="education-card">
                  <div className="edu-header">
                    <GraduationCap className="edu-icon" />
                    <div>
                      <h4 className="edu-title">Sri Krishna Aditya College of Arts and Science</h4>
                      <span className="edu-subtitle">B.Sc. Artificial Intelligence & Machine Learning</span>
                    </div>
                  </div>
                  <div className="edu-footer">
                    <span className="edu-date">2024 — 2027</span>
                    <span className="edu-gpa">GPA: 8.2 / 10.0</span>
                  </div>
                </div>
              </div>
              <div className="about-stats-column">
                <div className="stat-card">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Internship Roles completed in automation and analytics</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">Industry certifications (IBM, VOIS, GUVI, Alison)</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Python focus in modeling & embedded robotics logic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section scroll-reveal">
          <div className="section-container">
            <div className="section-header">
              <span className="section-label">02 // Experience</span>
              <h2 className="section-title">Industry Internships & Contributions</h2>
            </div>
            
            <div className="timeline">
              {/* Timeline Card 1: Wipro */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-duration">Feb 2026 — Apr 2026 (2 mos)</span>
                    <h3 className="timeline-role">Data Analyst Intern</h3>
                    <h4 className="timeline-company">Wipro <span className="project-tag">CIO Org</span></h4>
                  </div>
                  <p className="timeline-text">
                    Acted as a data specialist within Wipro&apos;s CIO Organization. Focused on analyzing critical organizational metrics, designing reporting channels, and automating workflows.
                  </p>
                  <ul className="timeline-bullets">
                    <li>Cleaned and preprocessed large corporate metadata using Python scripts, resolving 15% data inconsistency.</li>
                    <li>Built visual dashboard structures tracking IT operations KPIs and cloud resource allocation.</li>
                    <li>Supported database query design and optimization, streamlining reports delivered to the management.</li>
                  </ul>
                  <div className="timeline-skills">
                    <span className="tech-badge">Python</span>
                    <span className="tech-badge">Data Analysis</span>
                    <span className="tech-badge">SQL</span>
                    <span className="tech-badge">KPI Dashboards</span>
                  </div>
                </div>
              </div>

              {/* Timeline Card 2: ROBOMATIIC */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-duration">2024 — 2025</span>
                    <h3 className="timeline-role">Robotics with AI/ML Intern</h3>
                    <h4 className="timeline-company">ROBOMATIIC, CADD Technologies</h4>
                  </div>
                  <p className="timeline-text">
                    Applied machine learning principles to mechanical and embedded systems, developing decision matrices for robotic behaviors.
                  </p>
                  <ul className="timeline-bullets">
                    <li>Programmed sensors integration and path-planning algorithms using Python.</li>
                    <li>Tuned decision trees and basic classification models for real-time sensor array outputs.</li>
                    <li>Collaborated in testing robotic joints coordinates and hardware responses under simulated constraints.</li>
                  </ul>
                  <div className="timeline-skills">
                    <span className="tech-badge">Python</span>
                    <span className="tech-badge">Machine Learning</span>
                    <span className="tech-badge">Path Planning</span>
                    <span className="tech-badge">Embedded Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section scroll-reveal">
          <div className="section-container">
            <div className="section-header">
              <span className="section-label">03 // Core Competencies</span>
              <h2 className="section-title">Technical Expertise & Certifications</h2>
            </div>

            {/* Hard Skills & Soft Skills Grid */}
            <div className="skills-grid">
              {/* Hard Skills */}
              <div className="skills-column">
                <h3 className="skills-group-title">Languages & Frameworks</h3>
                <div className="skills-list">
                  <div className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">Python (PyTorch / Scikit-Learn / Pandas)</span>
                      <span className="skill-percent">Advanced</span>
                    </div>
                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: "90%" }}></div></div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">Data Analytics & SQL</span>
                      <span className="skill-percent">Intermediate</span>
                    </div>
                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: "80%" }}></div></div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">C++ Programming</span>
                      <span className="skill-percent">Intermediate</span>
                    </div>
                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: "70%" }}></div></div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">Java Programming</span>
                      <span className="skill-percent">Foundational</span>
                    </div>
                    <div className="skill-bar-bg"><div className="skill-bar-fill" style={{ width: "60%" }}></div></div>
                  </div>
                </div>
              </div>

              {/* Soft Skills & Focus */}
              <div className="skills-column">
                <h3 className="skills-group-title">Core Methodologies</h3>
                <div className="badges-grid">
                  <div className="badge-card">
                    <BarChart3 className="badge-card-icon" />
                    <h4>Data Preprocessing</h4>
                    <p>Handling missing values, feature scaling, and categorical variables cleaning.</p>
                  </div>
                  <div className="badge-card">
                    <Network className="badge-card-icon" />
                    <h4>Model Development</h4>
                    <p>Tuning hyperparameters, training MLP nets, classifier optimization.</p>
                  </div>
                  <div className="badge-card">
                    <GitBranch className="badge-card-icon" />
                    <h4>Soft Skills</h4>
                    <p>Leadership, Problem Solving, Critical Thinking, and Communication.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Subsection */}
            <div className="certifications-container">
              <h3 className="certs-section-title">Professional Training & Certifications</h3>
              <div className="certs-grid">
                <div className="cert-card">
                  <div className="cert-header">
                    <Award className="cert-icon" />
                    <span className="cert-platform">IBM (2025)</span>
                  </div>
                  <h4 className="cert-title">Web Development Course</h4>
                </div>
                <div className="cert-card">
                  <div className="cert-header">
                    <Award className="cert-icon" />
                    <span className="cert-platform">VOIS (2024)</span>
                  </div>
                  <h4 className="cert-title">Data Analytics Certification</h4>
                </div>
                <div className="cert-card">
                  <div className="cert-header">
                    <Award className="cert-icon" />
                    <span className="cert-platform">GUVI (2024)</span>
                  </div>
                  <h4 className="cert-title">Artificial Intelligence Essentials</h4>
                </div>
                <div className="cert-card">
                  <div className="cert-header">
                    <Award className="cert-icon" />
                    <span className="cert-platform">Pumo Technovation (2025-2026)</span>
                  </div>
                  <h4 className="cert-title">Data Science (Job-Ready Program)</h4>
                </div>
                <div className="cert-card">
                  <div className="cert-header">
                    <Award className="cert-icon" />
                    <span className="cert-platform">VOIS (2024)</span>
                  </div>
                  <h4 className="cert-title">Cyber Security Fundamentals</h4>
                </div>
                <div className="cert-card">
                  <div className="cert-header">
                    <Award className="cert-icon" />
                    <span className="cert-platform">Alison (2025)</span>
                  </div>
                  <h4 className="cert-title">Python Programming Advanced</h4>
                </div>
                <div className="cert-card">
                  <div className="cert-header">
                    <Award className="cert-icon" />
                    <span className="cert-platform">Amypo Technologies (2024)</span>
                  </div>
                  <h4 className="cert-title">Cloud Computing Core</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section scroll-reveal">
          <div className="section-container">
            <div className="section-header">
              <span className="section-label">04 // Contact</span>
              <h2 className="section-title">Let&apos;s Discuss Opportunities</h2>
              <p className="section-description">
                Drop me an email, connect on professional channels, or submit an inquiry using the API-style payload validator.
              </p>
            </div>

            <div className="contact-grid">
              {/* Info Cards */}
              <div className="contact-info">
                <div className="info-card">
                  <div className="info-icon-container">
                    <Mail className="info-icon" />
                  </div>
                  <div className="info-details">
                    <span className="info-label">Email</span>
                    <a href="mailto:tharanika1217@gmail.com" className="info-value">tharanika1217@gmail.com</a>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon-container">
                    <Phone className="info-icon" />
                  </div>
                  <div className="info-details">
                    <span className="info-label">Phone</span>
                    <a href="tel:+919363748246" className="info-value">+91 9363748246</a>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon-container">
                    <MapPin className="info-icon" />
                  </div>
                  <div className="info-details">
                    <span className="info-label">Location</span>
                    <span className="info-value">Coimbatore, Tamil Nadu, India</span>
                  </div>
                </div>

                <div className="social-links">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn cursor-hover-expand">
                    <GithubIcon size={16} /> GitHub
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn cursor-hover-expand">
                    <LinkedinIcon size={16} /> LinkedIn
                  </a>
                </div>
              </div>

              {/* API / JSON Styled Contact Form */}
              <div className="contact-form-container">
                <div className="form-titlebar">
                  <span className="form-titlebar-dot"></span>
                  <span className="form-titlebar-title">POST /api/v1/contact</span>
                </div>
                <form id="contact-form" className="api-form" onSubmit={handleFormSubmit}>
                  <div className="json-bracket">{"{"}</div>
                  <div className="json-body">
                    <div className="json-line">
                      <span className="json-key">&quot;sender_name&quot;</span>: 
                      <span className="json-input-wrapper">
                        <input 
                          type="text" 
                          id="form-name" 
                          required 
                          value={formData.sender_name}
                          onChange={handleInputChange}
                          placeholder='\"Your Name\"'
                        />
                      </span>,
                    </div>
                    <div className="json-line">
                      <span className="json-key">&quot;sender_email&quot;</span>: 
                      <span className="json-input-wrapper">
                        <input 
                          type="email" 
                          id="form-email" 
                          required 
                          value={formData.sender_email}
                          onChange={handleInputChange}
                          placeholder='\"your@email.com\"'
                        />
                      </span>,
                    </div>
                    <div className="json-line">
                      <span className="json-key">&quot;subject&quot;</span>: 
                      <span className="json-input-wrapper">
                        <input 
                          type="text" 
                          id="form-subject" 
                          required 
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder='\"Opportunity / Inquiry\"'
                        />
                      </span>,
                    </div>
                    <div className="json-line align-top">
                      <span className="json-key">&quot;message&quot;</span>: 
                      <span className="json-input-wrapper textarea-wrapper">
                        <textarea 
                          id="form-message" 
                          required 
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder='\"Write your message here...\"'
                        ></textarea>
                      </span>
                    </div>
                  </div>
                  <div className="json-bracket">{"}"}</div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-submit cursor-hover-expand" 
                    id="form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Sending Request... <Loader2 className="btn-icon animate-spin" />
                      </>
                    ) : (
                      <>
                        Execute Request <Send className="btn-icon" />
                      </>
                    )}
                  </button>
                </form>
                {statusMessage && (
                  <div 
                    id="form-status" 
                    className={`form-status ${statusMessage.type}`} 
                    style={{ display: 'block' }}
                  >
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {statusMessage.content}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2026 Tharanika T. Designed with a Minimal Tech SaaS aesthetic.</p>
          <p className="footer-subtext">Built with Next.js (App Router). Recruiter and performance optimized.</p>
        </div>
      </footer>
    </>
  );
}
