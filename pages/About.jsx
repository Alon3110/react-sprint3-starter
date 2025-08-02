export function About() {
    return (
        <section className="about-page">
            <div className="about-grid">

                {/* Alon Column */}
                <div className="about-column about-column-alon">
                    <p className="about-text about-text-alon">
                        My name is Alon, an rising star in web development, and I worked on the mail app
                    </p>

                    <div className="about-bottom about-bottom-alon">
                        <div className="about-circle-container about-circle-container-alon">
                            <div className="about-circle">
                                <img src="/img/alon.jpg" alt="Alon image" />
                                <span>Alon</span>
                            </div>
                        </div>
                        <div className="about-contact about-contact-alon">
                            <p>Contact via mail: <a href="https://mail.google.com">Lorem</a></p>
                            <p>Contact via mail: <a href="https://mail.google.com">Lorem</a></p>
                            <p>Contact via mail: <a href="https://mail.google.com">Lorem</a></p>
                        </div>
                    </div>
                </div>

                <div className="vertical-divider"></div>

                {/* Avishai Column */}
                <div className="about-column about-column-avishai">
                    <div className="about-top about-top-avishai">
                        <div className="about-contact about-contact-avishai">
                            <p>Contact via mail: <a href="mailto:avishai.gal@gmail.com">Mail</a></p>
                        </div>
                        <div className="about-circle-container about-circle-container-avishai">
                            <div className="about-circle">
                                <img src="/assets/img/avishai-pfp.jpg" alt="Avishai image" />
                                <span>Avishai</span>
                            </div>
                        </div>
                    </div>

                    <p className="about-text about-text-avishai">
                        My name is Avishai, I'm an aspiring web developer, and I worked on the note app
                    </p>
                </div>

            </div>
        </section>
    );
}
