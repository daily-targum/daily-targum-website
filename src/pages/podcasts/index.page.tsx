import * as React from "react";
import { actions, Podcast } from "../../aws";
import { imgix /* capitalizedToHypenated */ } from "../../utils";
import { GetStaticProps } from "next";
import { SEOProps } from "../../components/SEO";
import {
  Grid,
  AspectRatioImage,
  Section,
  Text,
  ActivityIndicator,
  //Navbar,
  Banner,
  // Link,
  Semantic,
} from "../../components";
// import { styleHelpers } from "../../utils";
import { SocialIcon } from "react-social-icons";
import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "../../store";
// import { podcastActions } from "../../store/ducks/podcast";
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import Styles from "./index.styles";
const { classNames, StyleSheet } = Styles;

function CoverImage({ podcast }: { podcast: Podcast }) {
  // const dispatch = useDispatch();
  // const firstEpisodeId = podcast.items[0].id;
  // const firstEpisode = podcast.items[0];
  // const isSelected =
  //   useSelector((s) => s.podcast.episode?.id) === firstEpisodeId;
  // const isPlaying = useSelector((s) => s.podcast.playState) === "play";

  // const show = podcast.items[0]?.show;

  // async function starter() {
  //   if (firstEpisode !== undefined) {
  //     await dispatch(podcastActions.loadPodcast(show, firstEpisode.id));
  //   }
  // }

  // React.useEffect(() => {
  //   //dispatch(podcastActions.loadPodcast());
  //   starter();
  //   console.log(podcast.items);
  //   dispatch(podcastActions.setPersist(true));
  // }, []);

  return (
    <AspectRatioImage
      data={imgix(podcast.coverArt, {
        xs: {
          ...imgix.presets.lg("1:1"),
          crop: undefined,
        },
      })}
      aspectRatio={1}
      className={classNames.imageShadow}
    />
  );
}

type Links = {
  spotify: string;
  youtube: string;
  soundcloud: string;
};

// PodcastLinks is the component that generates the links to the respective podcast platforms
// like Facebook, Spotify, YouTube, and SoundCloud.
function PodcastLinks({ show }: { show: string }) {
  const shows: { [key: string]: Links } = {
    "Targum Tea Podcast": {
      spotify:
        "https://open.spotify.com/playlist/6O74QKPd2XY6zmGuw1LO3T?si=6e9e6977f0e84e24",
      youtube:
        "https://www.youtube.com/playlist?list=PLqfNtg9bFcY0cjO1pUz27w3nafVjdoyVE",
      soundcloud: "https://soundcloud.com/dailytargum",
    },
    "Keeping Score": {
      spotify:
        "https://open.spotify.com/playlist/4MVciSzq31RCvxMHe1S3Cg?si=a453a0447de94448",
      youtube:
        "https://www.youtube.com/playlist?list=PLqfNtg9bFcY0cjO1pUz27w3nafVjdoyVE",
      soundcloud: "https://soundcloud.com/dailytargum",
    },
  };
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Text variant="h3">Available to listen on these platforms</Text>
      </div>
      <SocialIcon
        //bgColor={styleHelpers.color("textMuted")}
        //fgColor="white"
        className={classNames.podcastIcon}
        url={shows[show].spotify}
        network="spotify"
        target="_blank"
        rel="noopener noreferrer"
      />
      <SocialIcon
        //bgColor={styleHelpers.color("textMuted")}
        //fgColor="white"
        className={classNames.podcastIcon}
        url={shows[show].youtube}
        network="youtube"
        target="_blank"
        rel="noopener noreferrer"
      />
      <SocialIcon
        //bgColor={styleHelpers.color("textMuted")}
        //fgColor="white"
        className={classNames.podcastIcon}
        url={shows[show].soundcloud}
        network="soundcloud"
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
}

function PodcastComponent({
  podcast,
  reverse = false,
}: {
  podcast: Podcast;
  reverse?: boolean;
}) {
  return reverse ? (
    <Grid.Row cols={["2fr", "1fr"]}>
      <Grid.Col xs={2} md={0}>
        <CoverImage podcast={podcast} />
      </Grid.Col>
      <Grid.Col xs={2} md={1} className={classNames.podcastBody}>
        <Text variant="h1">{podcast.title}</Text>
        <Text variant="p">{podcast.description}</Text>
        <PodcastLinks show={podcast.title} />
      </Grid.Col>
      <Grid.Col xs={0} md={1}>
        <CoverImage podcast={podcast} />
      </Grid.Col>
    </Grid.Row>
  ) : (
    <Grid.Row cols={["1fr", "2fr"]}>
      <Grid.Col xs={2} md={1}>
        <CoverImage podcast={podcast} />
      </Grid.Col>
      <Grid.Col xs={2} md={1} className={classNames.podcastBody}>
        <Text variant="h1">{podcast.title}</Text>
        <Text variant="p">{podcast.description}</Text>
        <PodcastLinks show={podcast.title} />
      </Grid.Col>
    </Grid.Row>
  );
}

function Podcasts({ podcasts }: { podcasts: Podcast[] }) {
  // console.log(podcasts);
  const router = useRouter();
  // Navbar.useDynamicHeader();

  if (router.isFallback) {
    return <ActivityIndicator.Screen />;
  }

  return (
    <>
      <div className={classNames.page}>
        <Semantic role="main" skipNavContent pritable>
          <Banner text="Podcasts" />

          {podcasts.map((podcast, i) => (
            <Section classNameInside={classNames.podcastWrap} key={podcast.id}>
              <Section.OffsetPadding>
                <PodcastComponent podcast={podcast} reverse={i % 2 === 0} />
              </Section.OffsetPadding>
            </Section>
          ))}
        </Semantic>
      </div>
      {StyleSheet}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const podcastSlugs = ["Main"];

  const podcasts = await Promise.all(
    podcastSlugs.map((show) => actions.getPodcast({ show }))
  );

  const seo: SEOProps = {
    title: "Podcasts",
  };

  return {
    props: {
      podcasts: podcasts[0].items ?? [],
      seo,
    },
  };
};

export default Podcasts;
