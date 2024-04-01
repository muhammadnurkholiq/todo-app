/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';

import Box from '@mui/material/Box';

const Iconify = ({ icon, width = 20, sx, ...other }) => <Box component={Icon} icon={icon} sx={{ width, height: 20, ...sx }} {...other} />;

export default Iconify;
