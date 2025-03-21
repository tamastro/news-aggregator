import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Foooter';
import './App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const App: React.FC = () => {
	return (
		<Router>
			<div className='App'>
				<Header />
				<main>
					<Routes>
						<Route
							path='/'
							element={<HomePage />}
						/>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
