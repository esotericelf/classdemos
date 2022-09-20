import React from 'react';
import '../App.css';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
// import Geogebra from 'react-geogebra';

const ExampleBlock = ({ question, answer, gb, id }) => {

    return <div className="diagramWrap">
        <div className="container" draggable >
            {/* <!-- Left vertical line --> */}
            <div className="container__line"></div>

            {/* <!-- The timeline items container --> */}
            <ul className="container__items">
                {/* <!-- Each timeline item --> */}
                <li className="container__item">
                    {/* <!-- The circle and title --> */}
                    <div className="container__top">
                        {/* <!-- The circle --> */}
                        <div className="container__circle"></div>

                        {/* <!-- The title --> */}
                        <div className="container__title">
                            {question.map((item) => {
                                return <><h3><InlineMath>{item}</InlineMath><br /><br /></h3></>
                            })}
                        </div>
                    </div>

                    {/* <!-- The description --> */}
                    <div className="container__desc">
                        {answer.map((item) => {
                            return <><h3><InlineMath >{item}</InlineMath><br /><br /></h3></>
                        })}
                    </div>
                </li>

                {/* <!-- Repeat other items -->
        ... */}
            </ul>
        </div>
        {/* <div >
            {gb != ""
                ? <Geogebra
                    id={id}
                    width="800"
                    height="600"
                    material_id={gb}
                />
                : null
            }
        </div> */}
    </div>
}

export default ExampleBlock;