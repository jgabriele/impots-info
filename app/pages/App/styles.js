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

export const activeStyle = {
  color: '#D3D6C1',
  cursor: 'default'
}

export default theme => {
  return {
    navigation: {
      display: 'flex',
      margin: 0,
      padding: '0 24px',
      background: theme.palette.primary.main,
      color: 'white'
    },

    link: {
      listStyleType: 'none',
      padding: 24,
      margin: 0,
      cursor: 'pointer',
      color: 'inherit',
      textDecoration: 'none',

      '&:hover': {
        background: '#0F9EBA'
      }
    }
  }
}
