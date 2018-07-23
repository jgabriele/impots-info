const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

// #0EA0ED
// #0C73B5
// #C9EBE3
// #69E5F2
// #7EB1CC
//
// #C2F83A
// #37D1DE
// #355A47
// #B5E5E7
// #675D4F

export default theme => {
  return {
    landing: {
      ...flexCenter,
      background: `linear-gradient(0deg, #0F9EBA, ${theme.palette.primary.main})`,
      height: 800,
      padding: '0 48px'
    },

    picture: {
      ...flexCenter,
      flex: 1
    },

    cta: {
      ...flexCenter,
      flex: 1,
      flexDirection: 'column'
    },

    title: {
      width: '100%',
      fontSize: '3.5em',
      fontWeight: 300,
      color: theme.palette.common.white,

      '& strong': {
        fontSize: '4rem'
      }
    },

    subtitle: {
      width: '100%',
      fontSize: '2.2em',
      fontWeight: 300,
      color: theme.palette.common.white,
    },

    buttonLink: {
      textDecoration: 'none',
      width: '100%',
      marginTop: 96
    },

    button: {
      padding: '40px 48px',
      fontSize: '1.2em',
    },

    '@media (max-width: 960px)': {
      picture: {
        display: 'none'
      }
    },

    speech: {
      margin: '24px auto',
      padding: '0 24px',
      maxWidth: 800,
      textAlign: 'center',
      fontSize: '1.3em'
    },

    heading: {
      margin: '48px 0',
      fontSize: '2em'
    }
  }
}
