import React, { Fragment } from 'react'
import injectSheet from 'react-jss'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import styles from './styles'

class Home extends React.PureComponent {
  render () {
    const { classes } = this.props
    // Tests — <h1>Comprenez <strong>enfin</strong> comment fonctionne l'impôt sur le revenu</h1>

    // <section className={classes.speech}>
    //   <h2 className={classes.heading}>Qui je suis</h2>
    //   Mini qui je suis, pour en savoir plus rendez-vous <Link to={'/a-propos'}>sur la page dédiée</Link>
    // </section>

    return (
      <Fragment>
        <div className={classes.landing}>
          <section className={classes.picture}>
            <img />
            (Picture)
          </section>
          <section className={classes.cta}>
            <Typography variant="title" className={classes.title}>
              Estimez <strong>simplement</strong> votre impôt sur le revenu 2019
            </Typography>
            <Typography variant="title" className={classes.subtitle}>
              sans avoir à remplir 150 cases obscures
            </Typography>

            <Link to={'/calculer-mon-impot-sur-le-revenu'} className={classes.buttonLink}>
              <Button variant="contained" color="secondary" className={classes.button}>
                Accédez au simulateur (vraiment) simple
              </Button>
            </Link>
          </section>
        </div>

        <section className={classes.speech}>
          <h2 className={classes.heading}>L'impôt sur le revenu est un cauchemar à estimer.</h2>
          (Screenshot)
          <p>
            Le site du gouvernement met en place un&nbsp;
            <a href="https://www3.impots.gouv.fr/simulateur/calcul_impot/2018/simplifie/index.htm">
              Simulateur simplifié
            </a>
            &nbsp;si simple qu'il n'y a "que" 17 sections ne contenant pas moins de 179 lignes et 256 champs à (potentiellement) remplir
          </p>
          <p>Tout ça donne des milliards de possibilités, leur simulateur est paré à tous les cas possibles et chaque personne en France pourra simuler son impôt à coup sûr</p>

          <p>Mais cette exhaustivité (lire: "complexité") <strong>fait payer le prix à tous</strong>.
            Vous vous dites que c'est trop compliqué, que vous allez forcément vous tromper
            et ne saurez même pas si vous vous trompez.
            Et puis "bon, au final on verra bien le moment venu !"
          </p>
        </section>

        <section className={classes.speech}>
          <h2 className={classes.heading}>Et si je vous disais que vous n'avez pas besoin de tout remplir?</h2>

          <p>Et si je vous disais que dans la majorité des cas, seules 3 informations sont nécessaires ?</p>

          <p>Et si je vous disais que dès aujourd'hui vous pouvez estimer l'impôt que vous paierez l'année prochaine (prélevé à la source en l'occurrence), et <strong>mieux préparer vos dépenses dès maintenant pour l'année 2019</strong> ?</p>

          <p>Dirigez-vous vers <Link to={'/calculer-mon-impot-sur-le-revenu'}>le simulateur (vraiment) simple</Link> pour estimer vos impôts sur le revenu 2019</p>
        </section>

        <section className={classes.speech}>
          <h2 className={classes.heading}>Je veux comprendre comment est calculé l'impôt !</h2>
          <div><Link to={'/comment-est-calcule-mon-impot'}>Comment est calculé mon impôt sur le revenu?</Link></div>
        </section>

        <section className={classes.speech}>
          <h2 className={classes.heading}>J'aimerais bien savoir à quoi sert l'impôt sur le revenu !</h2>
          <div><Link to={'/a-quoi-sert-l-impot'}>À quoi sert l'impôt sur le revenu?</Link></div>
        </section>

      </Fragment>
    )
  }
}

export default injectSheet(styles)(Home)
