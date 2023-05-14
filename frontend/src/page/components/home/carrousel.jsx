const Carrousel = () => {
    return (
    <>
    <section class="section" id="testimonials">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <div class="center-heading">
                        <h2>Notre <em>équipe</em></h2>
                        <p>
                            Nous sommes une équipe passionnée qui aspire à découvrir de nouvelles méthodes d'apprentissage des langues, même si nous ne sommes pas des experts dans ce domaine... Nous espérons que notre projet vous plaira !</p>
                    </div>
                </div>
                <div class="col-lg-10 col-md-12 col-sm-12 mobile-bottom-fix-big"
                    data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                    <div class="owl-carousel owl-theme">
                        <div class="item service-item">
                            <div class="author">
                                <i><img src="https://cdn.discordapp.com/avatars/518823564921798658/8d0694c71e2a8b610fc0de3baeff658c.png?size=1024" alt="Author One"/></i>
                            </div>
                            <div class="testimonial-content">
                                <h4>Cédric</h4>
                                <p>Aime un peu trop python, fanatique de maths et d'info sur les bords (et j'aime pas les documentations 😭)</p>
                                <span>cedric.s</span>
                            </div>
                        </div>
                        <div class="item service-item">
                            <div class="author">
                                <i><img src="https://cdn.discordapp.com/avatars/414106691672604673/5be10ec5ddc446098427773e10810af2.png?size=1024" alt="Second Author"/></i>
                            </div>
                            <div class="testimonial-content">
                                <h4>Eliot</h4>
                                <p>🦙🎹</p>
                                <span>eliot.msi</span>
                            </div>
                        </div>
                        <div class="item service-item">
                            <div class="author">
                                <i><img src="https://cdn.discordapp.com/avatars/675392286342774805/971e28068768ea7fc3ea16c2df0711fd.png?size=1024" alt="Author Third"/></i>
                            </div>
                            <div class="testimonial-content">
                                <h4>Julien</h4>
                                <p>Fanatique de linux, des jeux RTS et de la cybersécurité.</p>
                                <span>justjulien</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    )
};

export default Carrousel;