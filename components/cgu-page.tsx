import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ModalPdfViewerProps {
  visible: boolean;
  onClose: () => void;
}

const ModalPdfViewer = ({ visible, onClose }: ModalPdfViewerProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Conditions générales d'utilisation
            </Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.contentContainer}>
              {/* En-tête */}
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>
                  Conditions générales d'utilisation
                </Text>
                <Text style={styles.date}>En vigueur au 22/01/2025</Text>
              </View>

              {/* Introduction */}
              <Text style={styles.paragraph}>
                Les présentes conditions générales d'utilisation (dites « CGU »)
                ont pour objet l'encadrement juridique des modalités de mise à
                disposition du site et des services par _______________ et de
                définir les conditions d'accès et d'utilisation des services par
                « l'Utilisateur ».
              </Text>

              <Text style={styles.paragraph}>
                Les présentes CGU sont accessibles sur le site à la rubrique
                «CGU».
              </Text>

              <Text style={styles.paragraph}>
                Toute inscription ou utilisation du site implique l'acceptation
                sans aucune réserve ni restriction des présentes CGU par
                l'utilisateur. Lors de l'inscription sur le site via le
                Formulaire d'inscription, chaque utilisateur accepte
                expressément les présentes CGU en cochant la case précédant le
                texte suivant : « Je reconnais avoir lu et compris les CGU et je
                les accepte ».
              </Text>

              {/* Article 1 */}
              <Text style={styles.articleTitle}>
                Article 1 : Les mentions légales
              </Text>
              <Text style={styles.paragraph}>
                L'édition et la direction de la publication du site
                https://jamify.daddyornot.xyz est assurée par Spina Sandro,
                domicilié 1 allee du serpolet.
              </Text>
              <Text style={styles.paragraph}>
                Numéro de téléphone est 0618481488
              </Text>
              <Text style={styles.paragraph}>
                Adresse e-mail spina.sandro69@gmail.com.
              </Text>

              {/* Article 2 */}
              <Text style={styles.articleTitle}>ARTICLE 2 : Accès au site</Text>
              <Text style={styles.paragraph}>
                Le site https://jamify.daddyornot.xyz permet à l'Utilisateur un
                accès gratuit aux services suivants :
              </Text>
              <Text style={styles.paragraph}>
                Le site internet propose les services suivants :
              </Text>
              <View style={styles.servicesList}>
                <Text style={styles.listItem}>
                  • Création de broadcast (diffusion) de musiques
                </Text>
                <Text style={styles.listItem}>
                  • Création d'évènements avec des informations données comme le
                  thème de l'évènement
                </Text>
                <Text style={styles.listItem}>
                  • Possibilité de rejoindre un évènement
                </Text>
                <Text style={styles.listItem}>
                  • Possibilité de rejoindre une diffusion (jam)
                </Text>
                <Text style={styles.listItem}>
                  • Génération de playlist se basant sur les recommandations de
                  l'utilisateur
                </Text>
                <Text style={styles.listItem}>
                  • Analyse de musiques disponibles sur spotify
                </Text>
                <Text style={styles.listItem}>
                  • Liaison avec le compte d'une application de musique tierse
                  (amazon, spotify)
                </Text>
                <Text style={styles.listItem}>
                  • Chat privé ouvert sans filtre et sans modération
                </Text>
                <Text style={styles.listItem}>
                  • Affichage d'une photo de profil correspondant à celle
                  disponible sur le provider externe
                </Text>
              </View>

              {/* Article 3 */}
              <Text style={styles.articleTitle}>
                ARTICLE 3 : Collecte des données
              </Text>
              <Text style={styles.paragraph}>
                Le site assure à l'Utilisateur une collecte et un traitement
                d'informations personnelles dans le respect de la vie privée
                conformément à la loi n°78-17 du 6 janvier 1978 relative à
                l'informatique, aux fichiers et aux libertés.
              </Text>

              {/* Article 4 */}
              <Text style={styles.articleTitle}>
                ARTICLE 4 : Propriété intellectuelle
              </Text>
              <Text style={styles.paragraph}>
                Les marques, logos, signes ainsi que tous les contenus du site
                (textes, images, son…) font l'objet d'une protection par le Code
                de la propriété intellectuelle et plus particulièrement par le
                droit d'auteur.
              </Text>

              {/* Article 5 */}
              <Text style={styles.articleTitle}>
                ARTICLE 5 : Responsabilité
              </Text>
              <Text style={styles.paragraph}>
                Les sources des informations diffusées sur le site
                https://jamify.daddyornot.xyz sont réputées fiables mais le site
                ne garantit pas qu'il soit exempt de défauts, d'erreurs ou
                d'omissions.
              </Text>

              {/* Article 6 */}
              <Text style={styles.articleTitle}>
                ARTICLE 6 : Liens hypertextes
              </Text>
              <Text style={styles.paragraph}>
                Des liens hypertextes peuvent être présents sur le site.
                L'Utilisateur est informé qu'en cliquant sur ces liens, il
                sortira du site https://jamify.daddyornot.xyz.
              </Text>

              {/* Article 7 */}
              <Text style={styles.articleTitle}>ARTICLE 7 : Cookies</Text>
              <Text style={styles.paragraph}>
                L'Utilisateur est informé que lors de ses visites sur le site,
                un cookie peut s'installer automatiquement sur son logiciel de
                navigation.
              </Text>

              {/* Article 8 */}
              <Text style={styles.articleTitle}>
                ARTICLE 8 : Publication par l'Utilisateur
              </Text>
              <Text style={styles.paragraph}>
                Le site permet aux membres de publier les contenus suivants :
                évènements et diffusions (JAM).
              </Text>

              {/* Article 9 */}
              <Text style={styles.articleTitle}>
                ARTICLE 9 : Droit applicable et juridiction compétente
              </Text>
              <Text style={styles.paragraph}>
                La législation française s'applique au présent contrat. En cas
                d'absence de résolution amiable d'un litige né entre les
                parties, les tribunaux français seront seuls compétents pour en
                connaître.
              </Text>

              <Text style={[styles.paragraph, styles.footer]}>
                CGU réalisées sur http://legalplace.fr/
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default ModalPdfViewer;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Jost_700Bold",
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    color: "#666",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: "justify",
  },
  servicesList: {
    marginLeft: 15,
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  footer: {
    marginTop: 30,
    fontStyle: "italic",
  },
});
