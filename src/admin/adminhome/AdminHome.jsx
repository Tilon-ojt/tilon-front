import '../adminhome/AdminHome.css';

function AdminHome(){
    return(
        <div className='admin-home'>
            <div className='admin-nav'>
                <div className='nav-logo'>
                    <img
                        alt='tilon-logo'
                        src='https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba'
                    />
                </div>
                <div className='txt-icon'>
                    <span>hi님 반갑습니다!</span>
                    <div>
                        <img
                            alt='log-out'
                        />
                    </div>
                </div>
            </div>

            <div className='admin-page'>
                <div className='admin-side'>
                    <ul>
                        <li> <a href='#'>내 정보 수정</a> </li>
                        <hr/>
                        <li> <a href='#'>뉴스</a> </li>
                        <hr/>
                        <li> <a href='#'>PR</a> </li>
                        <hr/>
                        <li> <a href='#'>INSIGHT</a> </li>
                        <hr/>
                    </ul>
                </div>

                <div className='admin-screen'>
                    <div></div>
                </div>

            </div>

        </div>
    );
}

export default AdminHome;