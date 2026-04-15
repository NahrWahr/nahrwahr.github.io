import Timeline from '../components/Timeline';

export default function Home() {
  return (
    <div className="content-box home-hero">

      {/* Profile Image */}
      <div className="home-profile-wrapper">
        <img
          src={`${import.meta.env.BASE_URL}images/profile.webp`}
          alt="Rahul Narwar"
          className="home-profile-img"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2334382e'/><path d='M50 45a15 15 0 1 0 0-30 15 15 0 0 0 0 30zM20 85h60v-5c0-15-10-25-30-25s-30 10-30 25v5z' fill='%238d9978'/><text x='50' y='55' font-size='4' text-anchor='middle' fill='%23e0e2d5'>Drop profile.webp into</text><text x='50' y='62' font-size='4' text-anchor='middle' fill='%23e0e2d5'>/public/images/</text></svg>";
          }}
        />
      </div>

      {/* Biography */}
      <div className="home-bio">
        <div className="home-bio-header">
          <h2 className="home-name">Rahul Narwar</h2>
          <p className="home-tagline">
            Analog &amp; Mixed-Signal IC Design
          </p>
        </div>

        <section className="home-intro">
          <p>
            I work on high speed SerDes and wireline circuit design.
            This site shows the trajectory I've taken, and fun things I got a chance to work on.
          </p>
          <p>
            I did my bachelors at Indian Institute of Information Technology, Kanpur.
            Worked for 2 years at startups in India on some very technical projects before coming to USA for my masters at University of California, Irvine.
          </p>
          <p>
            I hold a very strong interest in Semiconductor Physics and Photonics, and I'm always on the lookout for opportunities to work on cutting edge research in these fields.
          </p>
          <p>
            Some other things I can go on for hours about would be rockets, space exploration and science fiction.
            Engineering and sci-fi go surprisingly hand in hand.
          </p>
          <p>
            I'm currently based out of Irvine, CA.
          </p>
        </section>

        {/* Links */}
        <div className="home-links">
          <a href="https://www.linkedin.com/in/rahul-narwar-8627a8219/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href="https://github.com/NahrWahr" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href="mailto:rnarwar.137@gmail.com">
            Email ↗
          </a>
          <a href={`${import.meta.env.BASE_URL}documents/RahulNarwar_Resume_AN.pdf`} target="_blank" rel="noreferrer" className="home-resume-link">
            Resume (PDF) ⤵
          </a>
        </div>
      </div>

      {/* History Timeline */}
      <div className="home-timeline-section">
        <h3 className="home-timeline-heading">
          History &amp; Education
        </h3>
        <Timeline />
      </div>

    </div>
  );
}
