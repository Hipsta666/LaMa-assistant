import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Checkbox from '@mui/material/Checkbox';
import classes from './Select.module.css';

const Select = ({ data, resumeProfessionalRole, putProfessionalRole }) => {
	// const [resumeRolesEditByCategody, setResumeRolesEditByCategody] = React.useState(
	// 	data.roles.map((role) => role.id).filter((roleId) => resumeProfessionalRole.map((role) => role.id).includes(roleId))
	// );
	const [isOpen, setIsOpen] = React.useState(false);
	// React.useEffect(() => putProfessionalRole(resumeRolesEditByCategody, data.name), []);

	const toggleOpen = () => setIsOpen(!isOpen);
	// const handleChange = (event) => {
	// 	if (!resumeRolesEditByCategody.includes(event.target.id)) {
	// 		putProfessionalRole([...resumeRolesEditByCategody, event.target.id], data.name);
	// 		return setResumeRolesEditByCategody([...resumeRolesEditByCategody, event.target.id]);
	// 	}
	// 	putProfessionalRole(
	// 		resumeRolesEditByCategody.filter((id) => id !== event.target.id),
	// 		data.name
	// 	);
	// 	return setResumeRolesEditByCategody(resumeRolesEditByCategody.filter((id) => id !== event.target.id));
	// };

	const selectedRolesCount = React.useMemo(() => data.roles.filter((role) => resumeProfessionalRole.has(role.id)).length, [data.roles, resumeProfessionalRole]);

	// const handleChangeCategory = () => {
	// 	if (resumeRolesEditByCategody.length === data.roles.length) {
	// 		putProfessionalRole([], data.name);
	// 		setResumeRolesEditByCategody([]);
	// 	} else {
	// 		putProfessionalRole(
	// 			data.roles.map((role) => role.id),
	// 			data.name
	// 		);
	// 		setResumeRolesEditByCategody(data.roles.map((role) => role.id));
	// 	}
	// };

	return (
		<div>
			<div className={classes.select}>
				<span className={classes.arrowContainer}>
					<ArrowForwardIosIcon sx={{ fontSize: 15 }} className={isOpen ? classes.arrowDown : classes.arrowUp} onClick={toggleOpen} />
				</span>
				<Checkbox
					id={data.id}
					checked={selectedRolesCount === data.roles.length}
					indeterminate={selectedRolesCount > 0 && selectedRolesCount < data.roles.length}
					onChange={(event) => {
						putProfessionalRole(
							event.target.checked,
							data.roles.map((role) => role.id)
						);
					}}
					inputProps={{ 'aria-label': 'controlled' }}
					sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
					className={classes.checkbox}
				/>
				<span className={classes.name}>{data.name}</span>
			</div>
			{isOpen && (
				<div>
					{data.roles.map((role) => (
						<div key={role.id} className={classes.option}>
							<Checkbox
								id={role.id}
								checked={resumeProfessionalRole.has(role.id)}
								onChange={(event) => {
									putProfessionalRole(event.target.checked, [role.id]);
								}}
								inputProps={{ 'aria-label': 'controlled' }}
								sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
								className={classes.checkbox}
							/>
							{/* <input type='checkbox' id={role.id} checked={resumeRolesEdit.includes(role.id)} onChange={(e) => handleChange(e)} /> */}
							<span className={classes.name}>{role.name}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Select;

Select.propTypes = {
	data: PropTypes.object,
	resumeProfessionalRole: PropTypes.object,
	putProfessionalRole: PropTypes.func,
};
