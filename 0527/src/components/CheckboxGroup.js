import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Save } from '@material-ui/icons';

const CheckboxGroup = () => {
	const [checked, setChecked] = useState(true);

	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={checked}
					icon={<Save />}
					checkedIcon={<Save />}
					onChange={(e) => setChecked(e.target.checked)}
					inputProps={{
						'aria-label': 'secondary checkbox',
					}}
				/>
			}
			label="Testing Checkbox"
		/>
	);
};

export default CheckboxGroup;
