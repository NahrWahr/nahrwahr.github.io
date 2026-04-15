interface TimelineEvent {
  id: string;
  date: string;
  iconPath?: string;
  content: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    id: 'nvidia',
    date: 'Jun 2026 - Sep 2026',
    iconPath: `${import.meta.env.BASE_URL}images/Nvidia.webp`,
    content: (
      <>
        Analog and Mixed Signal Design at <strong>Nvidia</strong> (Upcoming). Working on PCIe clocking solutions.
      </>
    )
  },
  {
    id: 'uci',
    date: 'Sep 2025 - Present',
    iconPath: `${import.meta.env.BASE_URL}images/uc-irvine.svg`,
    content: (
      <>
        Graduate Student Researcher at <strong>UC Irvine</strong>. Frequency Synthesis and Phase interpolation for mmWave RADAR bands.
      </>
    )
  },
  {
    id: 'neocambrian',
    date: '2024 - 2025',
    iconPath: `${import.meta.env.BASE_URL}images/NeoCambrian.webp`,
    content: (
      <>
        Engineer at <strong>NeoCambrian</strong>. Designed Magneto-Hydro-Dynamic (MHD) Pumps for industrial furnaces used in aluminum recycling.
      </>
    )
  },
  {
    id: 'inspecity',
    date: '2023 - 2024',
    iconPath: `${import.meta.env.BASE_URL}images/Inspecity.webp`,
    content: (
      <>
        Engineer at <strong>Inspecity</strong>. Developed high accuracy orbit propagators for LEO satellites.
        Designed the GNC stack for satellite rendezvous and sensor fusion.
      </>
    )
  },
  {
    id: 'iitk',
    date: '2019 - 2023',
    iconPath: `${import.meta.env.BASE_URL}images/iit-kanpur.svg`,
    content: (
      <>
        B.S. Physics at <strong>IIT Kanpur</strong>. Focus on dynamical systems and stability.
      </>
    )
  }
];

export default function Timeline() {
  return (
    <div className="timeline" role="list" aria-label="History and education timeline">
      {events.map((event) => (
        <div key={event.id} className="timeline-item" role="listitem">
          <div className="timeline-date">{event.date}</div>
          <div className="timeline-icon" aria-hidden="true">
            {event.iconPath ? (
              <img src={event.iconPath} alt="" />
            ) : (
              <div className="timeline-icon-placeholder" />
            )}
          </div>
          <div className="timeline-content">
            {event.content}
          </div>
        </div>
      ))}
    </div>
  );
}
