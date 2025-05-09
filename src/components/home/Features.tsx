import { Box, Typography } from '@mui/material';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Box sx={{ 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'left', 
    justifyContent: 'center', 
    p: {xs: 3, md: 4}, 
    backgroundColor: 'rgba(255, 255, 255, 0.035)', 
    borderRadius: 2 
  }}>
    <Box>
      {icon}
    </Box>
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'left' }}>
        {title}
      </Typography>
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

export const Features = () => {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 16 16" fill="#0098EA" style={{ width: 48, height: 48 }}>
          <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z" />
          <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z" />
          <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z" />
        </svg>
      ),
      title: 'Solve',
      description: 'Solve problems and gain your skills in writing smart contracts'
    },
    {
      icon: (
        <svg fill="#0098EA" viewBox="0 0 511.999 511.999" style={{ width: 48, height: 48 }}>
          <path d="M280.068,0C175.516,0,90.293,84.355,88.886,188.58L40.731,327.056h48.138V430.24h93.414v81.759h219.545V338.606 c20.245-16.76,37.064-37.757,48.903-61.125c13.627-26.9,20.538-55.929,20.538-86.28C471.268,85.772,385.496,0,280.068,0z M377.402,319.17l-5.991,4.565v157.847H212.7v-81.759h-93.414V296.638H83.513l35.773-102.87v-2.569 c0-88.655,72.127-160.782,160.782-160.782c88.656,0,160.783,72.127,160.783,160.783 C440.851,241.806,417.726,288.45,377.402,319.17z" />
          <path d="M280.068,82.389c-56.801,0-103.014,46.212-103.014,103.015c0,27.2,10.504,52.856,29.578,72.242l1.39,1.412 c7.779,8.206,13.161,18.251,15.675,29.224v25.737c0,25.821,21.007,46.828,46.828,46.828h19.087 c25.821,0,46.828-21.007,46.828-46.828v-25.737c2.51-10.957,7.881-20.99,15.643-29.189l1.423-1.447 c19.074-19.387,29.578-45.043,29.578-72.242C383.083,128.601,336.87,82.389,280.068,82.389z M289.612,330.429h-19.087 c-9.049,0-16.411-7.362-16.411-16.411v-12.198h51.908v12.198h0.001C306.023,323.067,298.661,330.429,289.612,330.429z M269.872,185.403c0-5.622,4.574-10.197,10.196-10.197c5.622,0,10.197,4.574,10.197,10.197c0,5.622-4.575,10.196-10.197,10.196 C274.446,195.599,269.872,191.025,269.872,185.403z M332.258,235.868l-0.333,0.332c-10.042,10.005-17.596,22.01-22.229,35.203 h-14.42v-48.351c14.879-6.033,25.405-20.63,25.405-37.647c0-22.394-18.22-40.614-40.614-40.614 c-22.394,0-40.613,18.219-40.613,40.614c0,17.017,10.525,31.615,25.404,37.647v48.351h-14.419 c-4.631-13.194-12.187-25.198-22.229-35.203l-0.322-0.321c-13.172-13.609-20.418-31.508-20.418-50.474 c0-40.03,32.567-72.598,72.597-72.598c40.03,0,72.598,32.567,72.598,72.598C352.666,204.365,345.423,222.259,332.258,235.868z" />
        </svg>
      ),
      title: 'Learn',
      description: 'Learn from the community\'s solutions and share your own'
    },
    {
      icon: (
        <svg viewBox="-2 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 48 }}>
          <g>
            <g transform="translate(-4 -2)">
              <circle fill="#29c3db" opacity="0" cx="7" cy="7" r="7" transform="translate(5 3)" />
              <path d="M16.11,15.66,17,21l-5-1L7,21l.89-5.34" fill="none" stroke="#0098EA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <circle cx="7" cy="7" r="7" transform="translate(5 3)" fill="none" stroke="#0098EA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </g>
        </svg>
      ),
      title: 'Earn',
      description: 'Earn rewards for solving problems and contributing to the community'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        p: {xs: 1, md: 4},
        mb: 4,
        borderRadius: 3,
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </Box>
  );
}; 