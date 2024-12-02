import { LogOut } from 'lucide-react';

function Adminpage() {
    return (
        <div>
            <header className="header">
                <div className="logo-container">
                    <img src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba" alt="Tilon Logo" className="tilon-logo" />
                </div>
                <LogOut className='logout-icon' />
            </header>
        </div>
    )
}

export default Adminpage;