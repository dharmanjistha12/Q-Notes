import React from 'react'
import Addnotes from './Addnotes'
import Notes from './Notes'

const Home = (props) => {
	const {alertFunc}=props;
	return (
		<div>
			<Notes alertFunc={alertFunc}/>
		</div>
	)
}

export default Home

