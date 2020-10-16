import React, { Component } from 'react';
import '../styles/personal.css'

export class About extends Component {
    render() {
        return (
            <div className="contain_section">
                <div className="bgimg1" id="education">
                    <div className="caption">
                        <span className="border">Education</span>
                    </div>
                </div>
                <div className="contain-info">
                    <div className="threecolumn">
                        <div className="containTxt">
                            <h1><b>University of Pittsburgh '22</b></h1>
                            <h2>Computer Engineering</h2>
                        <p>
                                - Current GPA: 3.894
                            <br></br>- Majoring in Computer Engineering
                            <br></br>- Expected to Graduate in 2022
                        </p>
                        </div>
                    </div>

                    <div className="threecolumn">
                        <div className="containTxt">
                            <h1>Relevant Coursework</h1>
                            <p>Data Structures, Algorithm Implementation, Linear Circuits & Systems, Digital Circuits & Systems, ECE Analytical Methods, Microelectronic Circuits, Embedded Processor Interfacing, Signals Systems & Probability</p>
                            <h1>Industry Skills and Software</h1>
                            <p>
                                VHDL, FPGA Design, Java, C++, C, ARM Assembly, Kiel, Quartus Prime, GitHub, Visual Studios, XCode, MATLAB, Python, UNIX, Linux, HTML, CSS, JavaScript
                            </p>
                        </div>
                    </div>
                    <div className="threecolumn">
                        <div className="containTxt">
                            <h1><b>Seneca Valley School District '18</b></h1>
                            <h2 >top 10 graduate</h2>
                            <p>
                                - Unweighted GPA of 3.84<br></br>
                                - Weighted GPA of 5.32<br></br>
                                - Top 1% of Graduating class<br></br>
                                - CPR Certified (January 2017)<br></br>
                                - All Honors/College in Highschool/AP courses
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bgimg2" id="experience">
                    <div className="caption">
                        <span className="border">Experience</span>
                    </div>
                </div>

                <div className="contain-info">
                    <div className="threecolumn">
                        <div className="containTxt">
                            <h1><b>Student Volunteer</b></h1>
                            <h2><a href="https://www.nsf-shrec.org" target="_blank" style={{ textDecoration:"none"}}>NSF Center for Space, High-performance, and Resilient Computing</a></h2>
                            <p >
                                (May 2020 - Present)
                                <br></br><b>SURG 2020 FPGA/SoC team</b>
                                <br></br> - Training in concepts of FPGA/SoC architecture, tools, and development
                                <br></br> - Emphasis on hardware acceleration and interfaces
                                <br></br> - Apply concepts to HPC or HPEC domain
                            </p>
                        </div >
                    </div >

                <div className="threecolumn">
                    <div className="containTxt">
                        <h1><b>Software Engineering Intern</b></h1>
                        <h2 ><a href="http://www.microsoftnewengland.com/garage/" target="_blank" style={{textDecoration:"none"}}>Microsoft Garage</a></h2>

                        <p>
                            (June 2020 - August 2020)
                            <br></br>- Team of interns with end-to-end ownership of development and quality of a product
                            <br></br>- Define and implement quality criteria
                            <br></br> - Guidance and insight from technical coaches / mentors
                        </p >
                        
                    </div >
                </div >

                <div className="threecolumn">
                    <div className="containTxt">
                        <h1><b>Undergraduate Teaching Assistant</b></h1>
                        <h2 ><a href="https://psmobile.pitt.edu/app/catalog/showCourse/UPITT/190236/UGRD/2019-06-30" target="_blank" style={{ textDecoration:"none"}}>Swanson School of Engineering</a></h2>
                        <p>
                            (August 2019 - April 2020)
                            <br></br>- Utilize leadership and problem-solving skills to assist students in the development of C++ programs
                            <br></br>-  Develop and implement python auto-grading programs to evaluate student program output
                            <br></br>- Effectively communicate with students and the professor about course information.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bgimg3" id="extracurriculars">
                <div className="caption">
                    <span className="border">Extracurriculars</span>
                </div>
            </div>


            <div className="contain-info">
                <div className="threecolumn">
                    <div className="containTxt">
                        <h1><b>Westminster College Programming Competition</b></h1>
                        <h2 >2016-2018</h2>
                        <p >
                            - Used teamwork to solve a a series of puzzles<br></br>
                            - Wrote Java programs to solve the puzzles
                        </p>
                </div>
            </div>

            <div className="threecolumn">
                <div className="containTxt">
                    <h1><b>Penn State App Challenge</b></h1>
                    <h2 >Finalist 2016</h2>

                    <p>
                        - Worked as a team to come up with an app that solves a problem <br></br>
                        - Used graphic design skills to mock up the app<br></br>
                        - Took a leadership role to make sure the project was done on time to a high standard
                    </p>                 
                </div >
            </div >

            <div className="threecolumn">
                <div className="containTxt">
                    <h1><b>Pennsylvania Real Estate Licensing</b></h1>
                    <h2 >Exams Completed</h2>
                    <p>
                        - Course on McKissock Real Estate Express<br></br>
                        - National and State exams passed (April 2018)<br></br>
                        - Seneca Valley Graduation Project<br></br>
                    </p >

                    </div >
                </div >
            </div >
            <div className="contain-info">
                <div className="threecolumn">
                    <div className="containTxt">
                        <h1><b>App Mockup</b></h1>
                        <h2>Neighborly</h2>
                        <p>
                            - Created for AP Computer Science course<br></br>
                            - Created to solve a problem we saw<br></br>
                            - Neighborly established as a community tool rental service, evolved from there     
                        </p>
                    </div>
                </div >


                <div className="threecolumn">
                    <div className="containTxt">
                        <h1><b>Assistant Coaching</b></h1>
                        <h2>Seneca Valley Middle School Hockey</h2>
                        <p>
                            - Worked with a team of 6/7/8th graders<br></br>
                            -Improved leadership skills 
                        </p>
                    </div>
                </div >
            </div >


            <div className="contain-contact" id="contact">
                <h1 style={{color:"white", width:"100%", textAlign:"center", marginTop:".5em"}}>
                    Contact Me
                </h1>

                <div>
                    <div className="threecolumn">
                        <div className="containTxt">
                            <h2 ><b>Phone Number</b></h2>
                            <p>(724) 996-9713</p>
                        </div>
                    </div>
                    <div className="threecolumn">
                        <div className="containTxt">
                            <h2><b>Email</b></h2>
                            <p><a href="mailto:shr77@pitt.edu">shaneraible@pitt.edu</a></p>
                        </div>
                    </div>

                    <div className="threecolumn">
                        <div className="containTxt">
                            <h2><b>LinkedIn</b></h2>
                            <p><a href="https://www.linkedin.com/in/shaneraible">Shane Raible</a></p>
                        </div>
                    </div>
                    <p style={{ color: "white", width: "100%", textAlign: "center", marginTop: ".5em", letterSpacing:"5px" }}>
                        Website Developed by Shane Raible (2020)
                    </p>
                </div>
            </div>
        </div >
        );
    }
}
