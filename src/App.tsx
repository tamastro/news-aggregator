import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import Header from './components/Header';
import Footer from './components/Foooter';
import './styles/global.css';

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
						<Route
							path='/article/:url'
							element={<ArticlePage />}
						/>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
