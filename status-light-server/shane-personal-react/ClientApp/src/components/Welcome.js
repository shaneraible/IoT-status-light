import React, { Component } from 'react';

const phrases = ["Shane Raible", "a Pitt Student", "an aspiring Computer Engineer", "a Junior"];
const colors = ['#ed6a5a', '#f0a202', '#6cae75', '#fcca46', '#00ffff'];

const time_per_letter = 100; //ms//
const pause_on_phrase = 1000;
const delay_period = parseInt(pause_on_phrase / time_per_letter);

export class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            introPhrase: " ",
            delay: 0
        }

        this.word = 0;
        this.color = colors[this.word];
        this.letter = 0;
        this.isDeleting = false;
    }

    componentDidMount() {
        this.interval = setInterval(() => this.rotateText(), time_per_letter)
    }

    rotateText = () => {
        if (this.isDeleting) {
            if (this.letter > 0) {
                this.setState((prevState, introPhrase) => ({
                    introPhrase: prevState.introPhrase.substring(0, prevState.introPhrase.length - 1)
                }));
                this.letter = this.letter - 1;
            } else {
                this.word = (this.word + 1) % phrases.length;
                this.isDeleting = false;
                this.letter = 0;
                this.color = colors[this.word];
            }
        } else {
            if (this.letter < phrases[this.word].length) {
                this.setState((prevState, introPhrase) => ({
                    introPhrase: prevState.introPhrase + phrases[this.word][this.letter]
                }));
                this.letter = this.letter + 1;
            }
            else {
                if (this.state.delay < delay_period) {
                    this.setState((prevState, delay) => ({
                        delay: prevState.delay + 1
                    }));
                }
                else {
                    this.setState({ delay: 0 });
                    this.isDeleting = true;
                }
            }
        }
            
    }

    render() {
        return (
            <div className="intro">
                <div className="navbar">
                    <div style={{ float:"left", color:"white", fontSize:"60%", marginLeft:"5%"}}>
                        <p style={{color:"#ed6a5a"}}>Shane Raible</p>
                    </div>
                    <div className="navoptions">
                        <p>
                            <a href="#education" className="nav_link">Education</a> /
                        <a href="#experience" className="nav_link">Experience</a> /
                        <a href="#extracurriculars" className="nav_link">Extracurriculars</a> /
                        <a href="#contact" className="nav_link"> Contact Me </a>
                        </p>
                    </div>
                </div>
                <div className="contain_title">
                    <p className="intro_text" >Hello World! I'm 
                        <span style={{ borderRight: "0.08em solid #666", color: this.color}}>{this.state.introPhrase}</span>
                    </p>
                </div>
                <script src="../textRotate.js"></script> 
                <div style={{ bottom:"0", position:"absolute", float:"center", width: "100%" }}>
                    <div className='icon-scroll'></div >
                </div>
            </div>
        );
    }
}
