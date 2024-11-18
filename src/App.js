
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './App.css';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SplitType from 'split-type';
import backgroundVideo2 from './assets/fond_video3.mp4';
import backgroundVideo from './assets/fond_video2.mp4';
import backgroundVideo3 from './assets/fond_video1.mp4'
import image1 from './assets/thumb1.png';
import image2 from './assets/thumb2.png';
import image3 from './assets/thumb3.png'
gsap.registerPlugin( ScrollToPlugin);




function App() {
  const containerRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {

    const sections = document.querySelectorAll(".experience-item");
    sections.forEach((section) => {
      gsap.fromTo(section, { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);




  const animateText = (sectionId) => {
    const textElements = document.querySelectorAll(`#${sectionId} [data-animate]`);
    const classElements = document.querySelectorAll(`#${sectionId} [data-animate-class]`);

    textElements.forEach(element => {

      const typeSplit = new SplitType(element, {
        types: 'lines, words, chars',
        tagName: 'span'
      });


      gsap.from(typeSplit.words, {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        ease: 'back.out',
        stagger: 0.5,
        scrollTrigger: {
          trigger: element,
          start: 'top center',
        },
      });
    });

    classElements.forEach(element => {

      const typeSplitClass = new SplitType(element, {
        types: 'lines, words, chars',
        tagName: 'span'
      });


      gsap.from(typeSplitClass.words, {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        ease: 'back.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top center',
        },
      });
    });

  };
  const scrollToSection = (sectionId) => {

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('active');
    });


    const activeThumbnail = document.querySelector(`#thumbnail${sectionId.replace('page', '')}`);
    activeThumbnail.classList.add('active');


    if (isAnimating.current) return;
    const pages = document.querySelectorAll('.page');
    let currentSectionIndex = -1;


    pages.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        currentSectionIndex = index;
      }
    });

    if (currentSectionIndex !== -1) {

      const currentSectionId = pages[currentSectionIndex].id;
      animateText(currentSectionId);
    }


    if (isAnimating.current) return;



    isAnimating.current = true;

    gsap.to(window, {
      duration: 1.4,
      scrollTo: { y: `#${sectionId}`, offsetY: 0 },
      ease: 'power2.inOut',
      onComplete: () => {


        setTimeout(() => {
          isAnimating.current = false;
        }, 650);
      }
    });
  };


  const handleWheelScroll = (event) => {
    event.preventDefault();
    if (isAnimating.current) {


      return;
    }

    const pages = document.querySelectorAll('.page');
    let currentSectionIndex = -1;


    pages.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        currentSectionIndex = index;
      }
    });



    if (currentSectionIndex === -1) {

      return;
    }


    let targetSectionIndex;
    if (event.deltaY > 0) {

      targetSectionIndex = (currentSectionIndex + 1) % pages.length;
    } else {

      targetSectionIndex = (currentSectionIndex - 1 + pages.length) % pages.length;
    }



    scrollToSection(pages[targetSectionIndex].id);
  };

  useEffect(() => {
    const handleMouseWheel = (event) => {
      handleWheelScroll(event);
    };

    window.addEventListener('wheel', handleMouseWheel, { passive: false });


    return () => {
      window.removeEventListener('wheel', handleMouseWheel);

    };
  }, []);



  const handleMouseEnter = (e) => {
    const text = e.target.innerText;
    const letters = text.split('');
    e.target.innerHTML = '';
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.innerText = letter;
      span.style.display = 'inline-block';
      e.target.appendChild(span);

      gsap.fromTo(span, { rotationX: -100, opacity: 0 }, {
        rotationX: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.1
      });
    });
  };

  const handleMouseLeave = (e) => {
    const text = e.target.innerText;
    const letters = text.split('');
    e.target.innerHTML = '';
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.innerText = letter;
      span.style.display = 'inline-block';
      e.target.appendChild(span);

      gsap.fromTo(span, { rotationX: -100, opacity: 0 }, {
        rotationX: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.1
      });
    });
  };




  return (
    <div className="App">
      <div ref={containerRef}>
        <div className="nav-thumbnails">
          <img
            src={image1}
            alt="Page 1"
            id="thumbnail1"
            className="thumbnail"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('page1');
            }}
          />
          <img
            src={image2}
            alt="Page 2"
            id="thumbnail2"
            className="thumbnail"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('page2');
            }}
          />
          <img
            src={image3}
            alt="Page 3"
            id="thumbnail3"
            className="thumbnail"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('page3');
            }}
          />
        </div>

        <section id="page1" className="page">
          <video autoPlay loop muted id="video">
            <source src={backgroundVideo} type='video/mp4' />
          </video>

          <nav className="top-nav">
            <div className="nav-item">WEINSTEIN THOMAS</div>
            <div className="nav-item">FULL STACK DEVELOPER & UI DESIGNER<br />5th year Epitech Strasbourg student</div>
            <div className="nav-links">
              <a href="#page1" className='active' onClick={(e) => { e.preventDefault(); scrollToSection('page1'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</a>
              <a href="#page2" onClick={(e) => { e.preventDefault(); scrollToSection('page2'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Experience</a>
              <a href="#page3" onClick={(e) => { e.preventDefault(); scrollToSection('page3'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Skills & Technologies
              </a>
            </div>
          </nav>

          <header className="App-header">
            <h1 data-animate>WEINSTEIN <br /> THOMAS</h1>


            <footer className="bottom-nav">
              <div className="footer-links">
                <a data-animate href="mailto:thomas.weinstein@epitech.eu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Email</a>
                <a data-animate href="https://github.com/thomaswtn01" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>GitHub</a>
                <div className="availability">
                  Available for Internship [<span className="status-dot"></span>MAR. 2025]
                </div>
                <a data-animate href="https://www.linkedin.com/in/thomas-weinstein-a65544228/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>LinkedIn</a>
                <a data-animate href="https://www.codingame.com/profile/f55e9cc56be91cbdf16fff81f0d703a69115554" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>CodingG</a>
              </div>
            </footer>
          </header>
        </section>

        <section id="page2" className="page">
          {/* <h2 data-animate>EXPERIENCE</h2> */}
          <video autoPlay loop muted id="video">
            <source src={backgroundVideo2} type='video/mp4' />
          </video>
          <nav className="top-nav">
            <div className="nav-item">WEINSTEIN THOMAS</div>
            <div className="nav-item">FULL STACK DEVELOPER & UI DESIGNER<br />5th year Epitech Strasbourg student</div>
            <div className="nav-links">
              <a href="#page1" onClick={(e) => { e.preventDefault(); scrollToSection('page1'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</a>
              <a href="#page2" className='active' onClick={(e) => { e.preventDefault(); scrollToSection('page2'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Experience</a>
              <a href="#page3" onClick={(e) => { e.preventDefault(); scrollToSection('page3'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Skills & Technologies
              </a>
            </div>
          </nav>
          <div className="experience-content">
            <div className="experience-sections">
              <div className="experience-section">
                <h3>Professional Experiences</h3>
                <div data-animate-class className="experience-item">
                  <h4  >Mobile Developer - Kinassist</h4>
                  <p>Dec. 2022 - Present | Strasbourg, France</p>
                  <p>Technologies: Flutter, Xcode</p>
                </div>
                <div data-animate-class className="experience-item">
                  <h4 >Full Stack Developer - SAFETROOPER</h4>
                  <p>Apr. 2023 - Aug. 2023 | Strasbourg, France</p>
                </div>
                <div data-animate-class className="experience-item">
                  <h4  >Data-analyst - INEOS Automotive</h4>
                  <p>Aug. 2021 - Dec. 2021 | Hambach, France</p>
                </div>
              </div>

              {/* Educational Experiences */}
              <div className="experience-section">
                <h3  >Educational Experiences</h3>
                <div data-animate-class className="experience-item">
                  <h4 >Master in Computer Science - Epitech</h4>
                  <p>2020 - 2025</p>
                  <p>Skills: TypeScript, Flutter, Full-Stack Development, C++, Python, React.js</p>
                </div>
                <div data-animate-class className="experience-item">
                  <h4  >Computer Programming - 계명대학교</h4>
                  <p>Sep. 2023 - Jun. 2024</p>
                  <p>Skills: Unity, Maya</p>
                </div>
                <div data-animate-class className="experience-item">
                  <h4 >Scientific Baccalaureate - Lycée Saint-Antoine</h4>
                  <p>Sep. 2017 - Jun. 2019</p>
                </div>
              </div>
            </div>
          </div>



        </section>


        <section id="page3" className="page">
          <video autoPlay loop muted id="video">
            <source src={backgroundVideo3} type="video/mp4" />
          </video>
          <nav className="top-nav">
            <div className="nav-item">WEINSTEIN THOMAS</div>
            <div className="nav-item">
              FULL STACK DEVELOPER & UI DESIGNER<br />
              5th year Epitech Strasbourg student
            </div>
            <div className="nav-links">
              <a href="#page1" onClick={(e) => { e.preventDefault(); scrollToSection('page1'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</a>
              <a href="#page2" onClick={(e) => { e.preventDefault(); scrollToSection('page2'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Experience</a>
              <a href="#page3" className="active" onClick={(e) => { e.preventDefault(); scrollToSection('page3'); }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Skills & Technologies
              </a>
            </div>
          </nav>

          <div className="skills-section">
            <h2 data-animate>Skills & Technologies</h2>
            <div className="skills-grid">
              {[
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg", label: "Xcode" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original-wordmark.svg", label: "Unity" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", label: "TypeScript" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", label: "JavaScript" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", label: "Flutter" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg", label: "React.js" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg", label: "GitHub" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", label: "C++" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", label: "Python" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", label: "C" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg", label: "HTML5" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", label: "CSS" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", label: "Figma" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", label: "Linux" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", label: "Photoshop" },

              ].map((skill, index) => (
                <div className="skill-item" key={index}>
                  <img src={skill.src} alt={skill.label} />
                  <p>{skill.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}

export default App;