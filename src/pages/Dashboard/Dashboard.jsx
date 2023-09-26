import './Dashboard.css';
import './NewProfile.css';

import dashboard from '../../assets/dashboard.svg';
import transactions from '../../assets/transactions.svg';
import schedules from '../../assets/schedules.svg';
import users from '../../assets/users.svg';
import settings from '../../assets/settings.svg';
import search from '../../assets/search.svg';
import bell from '../../assets/bell.svg';
import profile from '../../assets/profile.svg';
import totalRevenue from '../../assets/totalRevenue.svg';
import totalTransactions from '../../assets/totaltransactions.svg';
import totalLikes from '../../assets/totalLikes.svg';
import totalUsers from '../../assets/totalLikes.svg';
import downArrow from '../../assets/downArrow.svg';
import whatsapp from '../../assets/whatsapp.svg';
import mail from '../../assets/mail.svg';
import insta from '../../assets/insta.svg';
import youtube from '../../assets/youtube.svg'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const barGraphOptions = {
    // responsive: true,
    categoryPercentage: 0.3,
    barPercentage: 0.85,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        display: false
        },  
    },
    scales: {
        y: {
            ticks: {
                stepSize: 100,
            }
        },
        x: {
            grid:{
                display: false
            }
        }
    }
};

const findWeekNumber = dateString => {
    const date = new Date(dateString);
    const getDate = parseInt(date.getDate());

    if( getDate>=1 && getDate<=7 ) return 'week1';
    else if( getDate>=8 && getDate<=14 ) return 'week2';
    else if( getDate>=15 && getDate<=21 ) return 'week3';
    else if( getDate>=22 && getDate<=31 ) return 'week4';
    else return 'some error in  computing week number';
}


const NewProfile = ({ usernameValue, usernameHandler, userMailValue, userMailHandler, userNumberValue, userNumberHandler, userInstaValue, userInstaHandler, userYtValue, userYtHandler, profileDisplayFuncttion, userProfileDisplayFunction }) => {

    const [ showNext, setShowNext ] = useState(false);

    const handleNext = (e) => {
        if(usernameValue.trim().length!==0 && userNumberValue.trim().length!==0 && userMailValue.trim().length!==0 ){
            e.preventDefault();
            setShowNext(true);
        }
    }

    const handleBack = e => {
        e.preventDefault();
        setShowNext(false);
    }

    const handleDone = e => {
        e.preventDefault();
        profileDisplayFuncttion(false);
        userProfileDisplayFunction(true)
    }

    return <div className='container-new-profile' >
        <div className={`new-profile-card ${ showNext ? 'show-next' : '' } `} >

            <div className='title-new-profile' > Add New Profile  <button className='cancel-sign' onClick={ () => profileDisplayFuncttion(false) } > X </button> </div>

            <div className='profile-details-type' >
                <div>
                    <div> Basic </div>
                    <div className='underline-container underline-basic' >
                        <span> </span>
                        <span> </span>
                    </div>
                </div>
                <div>
                    <div> Contact </div>
                    <div className='underline-container underline-contact' >
                        <span> </span>
                        <span> </span>
                    </div>
                </div>
            </div>

            <form className='profile-form' >
                <div>
                    <label>
                        Enter Name*
                        <input type='text' placeholder='Eg. John Doe' required value={usernameValue} onChange={ e => usernameHandler(e.target.value) } />
                    </label>
                    <label>
                        Enter Email*
                        <input type='text' placeholder='Eg. John@xyz.com' required value={userMailValue} onChange={ e => userMailHandler(e.target.value) } />
                    </label>
                    <label>
                        Enter Phone* 
                        <input type='text' placeholder='Eg. 9123456789' required value={userNumberValue} onChange={ e => userNumberHandler(e.target.value) } />
                    </label>

                    <div className='form-btn-container' >
                    <button className='btn-primary' onClick={ e => handleNext(e) } > Next </button>
                    </div>
                </div>

                <div>
                    <label>
                        Instagram Link <span className='gray-font' > (Optional) </span>
                        <input type='text' placeholder='Eg. ..instagram.com/username' value={userInstaValue} onChange={ e => userInstaHandler(e.target.value) } />
                    </label>
                    <label>
                        Youtube Link <span className='gray-font' > (Optional) </span>
                        <input type='text' placeholder='Eg. ..youtebe/username' value={userYtValue} onChange={ e => userYtHandler(e.target.value) } />
                    </label>
                    
                    <div className='form-btn-container' >
                    <button className='btn-secondary' onClick={ e => handleBack(e) } > Back </button>
                    <button className='btn-primary' onClick={ e => handleDone(e) } > Done </button>
                    </div>
                </div>
            </form>

        </div>
    </div>
}

export const Dashboard = () => {

    const [ dataCollection, setDataCollection ] = useState([]);
    const [ showNewProfile, setShowNewProfile ] = useState(false);
    const [ showUserProfile, setShowUserProfile ] = useState(false);
    const [ showAside, setShowAside ] = useState(false);
    const { setLoading } = useLogin()

    const [ username, setUsername ] = useState('');
    const [ userMail, setUserMail ] = useState('');
    const [ userNumber, setUserNumber ] = useState('');
    const [ userInsta, setUserInsta ] = useState('');
    const [ userYt, setUserYt ] = useState('');

    const { userCount, guestCount } = dataCollection?.reduce( ( accu, curr ) => {
        switch(findWeekNumber(curr.visitedAt)){
            case 'week1' : return curr.userType==='guest' ? ({ ...accu, guestCount: { ...accu.guestCount, week1: accu.guestCount.week1+1 } }) : ({ ...accu, userCount: { ...accu.userCount, week1: accu.userCount.week1+1 } })
            case 'week2' : return curr.userType==='guest' ? ({ ...accu, guestCount: { ...accu.guestCount, week2: accu.guestCount.week2+1 } }) : ({ ...accu, userCount: { ...accu.userCount, week2: accu.userCount.week2+1 } })
            case 'week3' : return curr.userType==='guest' ? ({ ...accu, guestCount: { ...accu.guestCount, week3: accu.guestCount.week3+1 } }) : ({ ...accu, userCount: { ...accu.userCount, week3: accu.userCount.week3+1 } })
            case 'week4' : return curr.userType==='guest' ? ({ ...accu, guestCount: { ...accu.guestCount, week4: accu.guestCount.week4+1 } }) : ({ ...accu, userCount: { ...accu.userCount, week4: accu.userCount.week4+1 } })

            default: console.error('some error in handleing date');
        }
    } , { userCount: { week1: 0, week2: 0, week3: 0, week4: 0 }, guestCount: { week1: 0, week2: 0, week3: 0, week4: 0 } } )

    const barGraphData =  {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          data: [ userCount?.week1, userCount?.week2, userCount?.week3, userCount?.week4 ],
          backgroundColor: '#98D89E',
          borderRadius: '8',
        }, {
            data: [guestCount?.week1, guestCount?.week2, guestCount?.week3, guestCount?.week4],
            backgroundColor: '#EE8484',
            borderRadius: '8',
        }]
    };
    
    const fetchData = async () => {
        try{
            const fetchCall = await axios.get('https://boardlogin.05him.repl.co/data');
            if(fetchCall.status===200){
                setDataCollection(fetchCall.data.data);
            }
        }
        catch(eror){
            console.error(eror);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect( () => {
        setLoading(true);
       fetchData();
    }, [] )

    return <>
        { showNewProfile &&
         <NewProfile 
            usernameValue={username}
            usernameHandler={setUsername}
            userNumberValue={userNumber}
            userNumberHandler={setUserNumber}
            userMailValue={userMail}
            userMailHandler={setUserMail}
            userInstaValue={userInsta}
            userInstaHandler={setUserInsta}
            userYtValue={userYt}
            userYtHandler={setUserYt}
            profileDisplayFuncttion={setShowNewProfile}
            userProfileDisplayFunction={setShowUserProfile}  /> 
        }
        
        <div className="container-dashboard" >
        <aside className={showAside && 'show-aside' } >
            <button className='aside-cross' onClick={ () => setShowAside(false) } > X </button>
            <h2> Board. </h2>

            <ul className='aside-nav' >
                <li> <img src={dashboard} alt='dashboard' /> Dashboard </li>
                <li> <img src={transactions} alt='transactions' /> Transactions </li>
                <li> <img src={schedules} alt='schedules' /> Schedules </li>
                <li> <img src={users} alt='users' /> Users </li>
                <li> <img src={settings} alt='settings' /> Settings </li>
            </ul>

            <ul className='aside-footer' >
                <li> Help </li>
                <li> Contact Us </li>
            </ul>
        </aside>

        <main className='dashboard-main' >
            <nav className='dashboard-nav' >
                <div className='nav-section1' >
                    <button className='hamburger' onClick={ () => setShowAside(true) } >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>  

                    <h3> Dashboard </h3>
                </div>
                
                <div className='nav-section2' >
                    <div className='container-nav-search' >
                        <input type='text' placeholder='Search..' />
                        <button> <img src={search} alt='search' /> </button>
                    </div>

                    <img src={bell} alt='bell' />
                    <img src={profile} alt='profile photo' />
                </div>
            </nav>

            <section className='dashboard-section1' >
                <div>
                    <img src={totalRevenue} alt='total revenue icon' />
                    <div className='text-total' > Total Revenues </div>
                    <div className='total-stats' > 
                        <img src={downArrow} alt='down arrow' className='revenue-down-arrow' />
                        <span className='stats-numbers' > $2,129,430 </span> 
                        <span className='stats-percentage' > +2.5% </span>
                    </div>
                </div>
                
                <div>
                    <img src={totalTransactions} alt='total transactions' />
                    <div className='text-total' > Total Transactions </div>
                    <div className='total-stats' > 
                        <span className='stats-numbers' > 1,520 </span> 
                        <span className='stats-percentage' > +1.7% </span>
                    </div>
                </div>

                <div>
                    <img src={totalLikes} alt='total likes' />
                    <div className='text-total' > Total Likes </div>
                    <div className='total-stats' > 
                        <span className='stats-numbers' > 9,721 </span> 
                        <span className='stats-percentage' > +1.4% </span>
                    </div>
                </div>

                <div>
                    <img src={totalUsers} alt='total users' />
                    <div className='text-total' > Total Users </div>
                    <div className='total-stats' > 
                        <span className='stats-numbers' > 9,721 </span> 
                        <span className='stats-percentage' > +4.2% </span>
                    </div>
                </div>
            </section>

            <section className='dashboard-section2' >
                <div className='bar-graph-details' >
                    <div className='timeline'>
                        <h4> Activities </h4>
                        <div className='gray-font' > May - June 2021 </div>
                    </div>

                    <div className='bar-graph-labels' >
                        <div className='guest-label' > <span> </span> Guest </div>
                        <div className='user-label' > <span> </span> User </div>
                    </div>
                </div>
                <div className='container-bar-graph' >
                    <Bar data={barGraphData} options={barGraphOptions} />
                </div>
            </section>

            <section className='dashboard-section3' >

                <div className='container-top-products' >
                    <div className='top-products-title' >
                        <h4> Top Products </h4>
                        <div className='gray-font' > May - June 2021 </div>
                    </div>

                    <div className='top-products-graph' >
                        <div className='container-ring' >   
                            <div className='green-box' ></div>
                            <div className='yellow-red-container' >
                                <div className='yellow-box' ></div>
                                <div className='red-box' ></div>
                            </div>
                            <div  className='circle' ></div>
                        </div>

                        <ul className='top-products-details' >
                            <li className='basic-tees' > Basic Tees
                                <span className='gray-font' > 55% </span>
                            </li>
                            <li className='custom-short-pants' > Custom Short Pants
                                <span className='gray-font'> 31% </span>
                            </li>
                            <li className='super-hoodies' > Super Hoodies
                                <span className='gray-font'> 14% </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='container-profile' >
                    {
                        showUserProfile ? 
                        <div className='user-profile-card' >
                        <div className='user-name' > { username } </div>
                        <div className='user-profile-details' >
                            <div> <img src={whatsapp} alt='phone' /> {userNumber} </div>
                            { userInsta.trim().length>0 && <div> <img src={insta} alt='insta' /> {userInsta} </div> }
                            <div> <img src={mail} alt='mail' /> {userMail} </div>
                            { userYt.trim().length>0 && <div> <img src={youtube} alt='youtube' /> {userYt} </div> }
                        </div>
                        </div> 
                        :
                     <div className='container-add-new-profile' >
                        <button onClick={ () => setShowNewProfile(true) } > + </button>
                        <div> Add Profile </div>
                    </div>
                    }
                </div>

            </section>
        </main>
    </div>
    </>
}