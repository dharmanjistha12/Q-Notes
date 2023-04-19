import React from 'react'

export default function Alert(props) {
	const capitalize = (word) => {
		if (word==='danger') {
			word='error'
		}
		const lower = word.toLowerCase();
		return lower.charAt(0).toUpperCase() + lower.slice(1);
	}
	return (
		<div style={{ height: '50px' }}>
			{props.myAlert && <div className={`alert alert-${props.myAlert.type} alert-dismissible fade show`} role="alert">
				<strong>{capitalize(props.myAlert.type)}</strong>: {props.myAlert.msg}
			</div>}
		</div>
	)
}