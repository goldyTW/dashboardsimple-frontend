import "./style.scss";
import React, { useEffect, useState, useRef } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import ReactToPrint from "react-to-print";
import Cookies from 'js-cookie';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Input, Card } from 'antd';
import { Icon } from "@iconify/react";

const SuratJalan = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ;
  let componentRef = useRef();

  useEffect(() => {
    // if(!Cookies.get('user-data')){
    //   navigate('/login', { replace: true });
    // }
  }, [])

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div className='row py-3 justify-content-center'>
            <div className='col-lg-6 p-4 mt-2'>
                <span className='invoiceTitle'>CV. EMESTE</span><br></br>
                <span className="invoiceSlogan">MENJUAL RUPA-RUPA BAHAN TEKSTIL</span><br></br>
                <span className='invoiceAlamat'>Jl. Waru No. 7A Kampung Bali, </span><br></br>
                <span className='invoiceAlamat'>Tanah Abang, Jakarta Pusat 10250</span><br></br>
                <span className='invoiceAlamat'>081311997959 - 087877901779</span><br></br>
            </div>
            <div className='col-lg-6 p-4'>
                <div className='row justify-content-end py-2'>
                    <div className='col-lg-1 mx-4 keteranganInvoice'>Tanggal</div>
                    <div className='col-lg-4 mx-4 keteranganInvoice'>{moment('2023-11-11').format("DD MMMM YYYY")}</div>
                </div>
                <div className='row justify-content-end py-2'>
                    <div className='col-lg-1 mx-4 keteranganInvoice'>Kepada</div>
                    <div className='col-lg-4 mx-4 keteranganInvoice'>
                      <b>Pak Haji</b><br></br>
                      <b>Alamat</b>
                      {/* {customer + " " +getCustomer(customer)} */}
                    </div>
                </div>
                <div className='row justify-content-end mt-4'>
                  <div className='col-lg-5 mx-4 notafaktur'>
                    Nota Faktur: <b>123456</b>
                  </div>
                </div>
            </div>
            <div className='col-12 p-3'>
              <div className='row justify-content-center text-center'>
                  <div className='col-lg-1 py-2 invTable'><b>No</b></div>
                  <div className='col-lg-5 py-2 invTable'><b>Nama Barang</b></div>
                  <div className='col-lg-1 py-2 invTable'><b>QTY</b></div>
                  <div className='col-lg-2 py-2 invTable'><b>Harga (Rp.)</b></div>
                  <div className='col-lg-2 py-2 invTable'><b>Jumlah (Rp.)</b></div>
              </div>    
              {/* {
                  pembelian && pembelian.map((item, i) => (
                      (grandtotal += item.afterdiskon),
                      <div className='row justify-content-center text-center'>
                          <div className='col-lg-1 py-2 invTable'>{i+1}</div>
                          <div className='col-lg-1 py-2 invTable'>{item.tipe == "penggunaan voucher" ? 'voucher' : item.tipe}</div>
                          <div className='col-lg-5 py-2 invTable'>{item.tipe == "produk" ? getProductName(item.item) : item.item+' '+getVoucherName(item.item)
                          // +(item.sisa ? item.sisa : getSisa(item.item))
                          }
                          </div>
                          <div className='col-lg-1 py-2 invTable'>{item.jumlah && item.jumlah.toLocaleString('id')}</div>
                          <div className='col-lg-2 py-2 invTable'>{item.afterdiskon && item.afterdiskon.toLocaleString('id')}</div>
                      </div>
                  ))
              } */}
              <div className='row justify-content-center text-center'>
                  <div className='col-lg-6 py-2 invTable'><b>Total</b></div>
                  <div className='col-lg-1 py-2 invTable'><b>???</b></div>
                  <div className='col-lg-2 py-2 invTable'><b></b></div>
                  <div className='col-lg-2 py-2 invTable'><b>???</b></div>
                  {/* <div className='col-lg-2 py-2 invTable'><b>{grandtotal && grandtotal.toLocaleString('id')}</b></div> */}
              </div>
            </div>
            <div className='col-12 p-3'>
              <div className='row justify-content-center text-center'>
                <div className='col-4 p-3'>
                  <div className="pb-5">Yang Memesan</div>
                  <div className="pt-5"><b>Pak Haji</b></div>
                </div>
                <div className='col-4 p-3'>
                  <div className="pb-5">Hormat Kami</div>
                  <div className="pt-5"><b>Margaretha</b></div>
                </div>
                <div className='col-4 p-3'>
                  <div className="pb-5">Supir/Kenek</div>
                  <div className="pt-5"><b>Budi</b></div>
                  <div className="">Plat: B 444 UUU</div>
                </div>
              </div>
            </div>
        </div> 
      );
    }
  }

  function exit(){
    // localStorage.removeItem('pembelian')
    // localStorage.removeItem('customer')
    // localStorage.removeItem('paymentMethod')
    // localStorage.removeItem('clinicStaff')
    // localStorage.removeItem('noinv')
    // localStorage.removeItem('tglsales')
    navigate('/', { replace: true });
}

  return (
    <div className="main">
      <div className={sidebarOpen ? "mainSideLayoutFull" : "mainSideLayoutNotFull" }>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      </div>
      <div className={sidebarOpen ? "mainNavLayoutNotFull" : "mainNavLayoutFull" }>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className='row px-3 mt-4 justify-content-center'>
          <div className='col-12 text-end'>
              <ReactToPrint
                  trigger={() => <button className='btnSave'>Print Out</button>}
                  content={() => componentRef}
              />
              <button className='btnKeluar' onClick={()=> exit()}>Keluar</button>
          </div>
        </div>
        <ComponentToPrint ref={(el) => (componentRef = el)} />
      </div>
    </div>
  )
}

export default SuratJalan