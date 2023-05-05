// Import Stylesheet
import "../assets/css/sectionHeading.css";

const SectionHeading = (props) => {
  return (
    <div className="wrapper">
      <section className="section-heading">
        <h2 className="section-title">{props.title}</h2>
        <p className="section-desc">{props.desc}</p>
      </section>
    </div>
  );
};

export default SectionHeading;
