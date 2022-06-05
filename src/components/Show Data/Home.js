import React, { useEffect, useState } from 'react'
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import './../LandingPage.css';
import Content from './../CardCompt';
import { Footer } from '../Footer';
import Img1 from "./../../assets/image/v1.png";
import Img2 from "./../../assets/image/v2.png";

//fungsi untul effect scroll
const scrollToSection = (flag) => {
  scroller.scrollTo(flag, {
    duration: 800,
    offset:-70,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function Home() {
    //inisialisasi variable data
    const [value, setValue] = useState({
        codes: [],
        namaBarang: "",
        kuantitas: "",
        tanggalPemesanan: "",
        tanggalPengiriman: "",
        profitPerPcs:"",
        profitTotal:"",
        hasCompany:"",
        priority:"",
    });

    //inisialisasi state awal untuk searching dan search input
    const [searching, setSearching] = useState(false);
    const [statusInput, setStatusInput] = useState(false);

    //fungsi getData untuk mengambil data dari url
    const getData = async () => {
        const BASE_URL = "http://localhost:3030/dataOrder/query"; //url fuseki

        const headers = {
            Accept: "application/sparql-results+json,*/*;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        };

        //membuat varibel untuk menampung query get data
        const queryData = {
            query:`
            PREFIX ab: <http://learningsparql.com/ns/addressbook#>
            SELECT *
            WHERE
            {
                ?order ab:namaBarang ?namaBarang .
                ?order ab:kuantitas ?kuantitas .
                ?order ab:tanggalPemesanan ?tanggalPemesanan .
                ?order ab:tanggalPengiriman ?tanggalPengiriman.
                ?order ab:profitPerPcs ?profitPerPcs.
                ?order ab:profitTotal ?profitTotal.
                ?order ab:hasCompany ?hasCompany.
                ?order ab:priority ?priority.
                
                FILTER (
                regex(?namaBarang, "${value.input}", "i") ||
                regex(?kuantitas, "${value.input}", "i") ||
                regex(?tanggalPemesanan, "${value.input}", "i") ||
                regex(?tanggalPengiriman, "${value.input}", "i") ||
                regex(?profitPerPcs, "${value.input}", "i") ||
                regex(?profitTotal, "${value.input}", "i") ||
                regex(?hasCompany, "${value.input}", "i") ||
                regex(?priority, "${value.input}", "i")
                )
            }`,
        };

        setSearching(true);
        setStatusInput(true);
        document.getElementById('myInput').value = '';
        scrollToSection("codes");

        try {
            const { data } = await axios(BASE_URL, {
                method: "POST",
                headers,
                data: qs.stringify(queryData),
            });
            console.log(data);

            //convert data
            const formatted_data = data.results.bindings.map((code, index) => 
            formatter(code, index));
            console.log(formatted_data);

            setValue({
                ...value,
                codes: formatted_data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const getAllData = async () => {
        const BASE_URL = "http://localhost:3030/dataOrder/query"; //url fuseki

        const headers = {
            Accept: "application/sparql-results+json,*/*;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        };

        //membuat varibel untuk menampung query get data
        const queryData = {
            query: `
            PREFIX ab: <http://learningsparql.com/ns/addressbook#>

            SELECT *
            WHERE {
                ?order ab:namaBarang ?namaBarang .
                ?order ab:kuantitas ?kuantitas .
                ?order ab:tanggalPemesanan ?tanggalPemesanan .
                ?order ab:tanggalPengiriman ?tanggalPengiriman.
                ?order ab:profitPerPcs ?profitPerPcs.
                ?order ab:profitTotal ?profitTotal.
                ?order ab:hasCompany ?hasCompany.
                ?order ab:priority ?priority.
            }
            ORDER BY ASC(?order)`,
        };
        
        setStatusInput(false);
        scrollToSection("codes");

        try {
            const { data } = await axios(BASE_URL, {
                method: "POST",
                headers,
                data: qs.stringify(queryData),
            });
            console.log(data);

            //convert data
            const formatted_data = data.results.bindings.map((code, index) => 
            formatter(code, index)
            );
            console.log(formatted_data);

            setValue({
                ...value,
                codes: formatted_data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const formatter = (codes, index) => {
        return {
            id: index,
            namaBarang: codes.namaBarang.value,
            kuantitas: codes.kuantitas.value,
            tanggalPemesanan: codes.tanggalPemesanan.value,
            tanggalPengiriman: codes.tanggalPengiriman.value,
            profitPerPcs: codes.profitPerPcs.value,
            profitTotal: codes.profitTotal.value,
            hasCompany: codes.hasCompany.value,
            priority: codes.priority.value,
        };
    };

    const handleChange = (event) => {
        setValue({
        ...value,
        input: event.target.value,
        });
    };

    const content = value.codes.map((code) => (
        <Content 
            id={code.id}
            namaBarang={code.namaBarang}
            kuantitas={code.kuantitas}
            tanggalPemesanan={code.tanggalPemesanan}
            tanggalPengiriman={code.tanggalPengiriman}
            profitPerPcs={code.profitPerPcs}
            profitTotal={code.profitTotal}
            hasCompany={code.hasCompany}
            priority={code.priority}

        />
    ));
    return ( 
    <>
        <div className="large-container">
        <div className="container">
            <div className="home" id="home">
                <h1 className='title'>Rekapitulasi Pemesanan Produk Pada Perusahaan Manufaktur ICI </h1>
                <div className="search-wrapper">
                    <div className="search_box">
                        <input 
                        id='myInput'
                        type="text"
                        className="input"
                        placeholder="search..."
                        setvalue={value.input}
                        onChange={handleChange}
                        required="required"
                        />
                    </div>
                    <div className="button-wrapper-get-all">
                        <button        
                        type="button"
                        value="Search"
                        onClick={getData} 
                        className='card-btn'>Search</button>
                        <button        
                        type="button"
                        value="Search"
                        onClick={getAllData} 
                        className='btn-get-all '>Show All Data</button>
                    </div>
                </div>
            </div>
        </div>

            <div className="codes">
                <div className="container-data">
                    <div className="result-title-wrap">
                        <h1 className='result-title'>Search Result</h1>
                    </div>
                    <div>
                        {
                            (() => {
                                if(content.length === 0) {
                                    return (
                                        <div>
                                            {
                                                searching === false ? (
                                                    <>
                                                        <div className="img-wrap">
                                                            <img src={Img1} alt="" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="result-data">Keyword : "{value.input}"</h3>
                                                        <p className='warn'>Product Doesn't Exist</p>
                                                        <div className="img-wrap">
                                                            <img src={Img2} alt="" />
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    );
                                } else {
                                    return (
                                    <div>
                                        <h3 className="result2-data ">Result : {content.length} data</h3>
                                        {
                                        statusInput === true ?(<h3 className="result2-data ">Keyword : " {value.input} "</h3>
                                        ):(<></>)
                                        }
                                        
                                        {content}</div>);
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
    </div>
    <Footer />
    </>
    )
}

export default Home