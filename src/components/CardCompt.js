import React from 'react'
import './CardCompt.css'

export const CardCompt = (props) => {
  return (
    <div key={props.id} className="code-list">
            <ul>
                <li>
                    <div className="title">
                        <h1>{props.id + 1}<span>. </span>{props.namaBarang}</h1>
                    </div>
                    <div className="content">
                        <h3>Quantity: {props.kuantitas}</h3>
                        <h3>Tanggal Pemesanan: {props.tanggalPemesanan}</h3>
                        <h3>Tanggal Pengiriman : {props.tanggalPengiriman}</h3>
                        <h3>Profit Per Pcs : {props.profitPerPcs}</h3>
                        <h3>Profit Total : {props.profitTotal}</h3>
                        <h3>Client : {props.hasCompany}</h3>
                        <h3>Priority : {props.priority}</h3>
                    </div>
                </li>
            </ul>
        </div>
  )
}
CardCompt.defaultProps = {
    id : '123',
    title : 'abc',
    author : 'abc',
    category : 'abc',
    language : 'abc',
    publisher : 'abc',
    published_date : 'abc',
    page_count : 'abc',
    price : 'abc'
}

export default CardCompt;
