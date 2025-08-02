import { showSuccessMsg } from '../services/event-bus.service.js'

export function Home() {
    return <section className="home-container home">
        <div className="box-container">
            <div className="box1">
                <h1>
                    <span className="blue">G</span>
                    <span className="red">o</span>
                    <span className="yellow">o</span>
                    <span className="blue">g</span>
                    <span className="green">l</span>
                    <span className="red">e</span></h1>
            </div>
            <div class="search-wrapper">
                <div class="search-bar">
                    <span class="search-icon"><img src="../assets/img/svgs/search.svg" alt="" /></span>
                    <input type="text" placeholder="Search Google or type a URL" />
                </div>
            </div>
        </div>
    </section>
}


