import React, { useState, useEffect, useRef } from 'react';
import DetailMovieSection from '../sections/VIewPage/DetailMovieSection';
import InfoMovieSection from '../sections/VIewPage/InfoMovieSection';
import ProposeSection from '../sections/VIewPage/ProposeSection';
import CommentSection from '../sections/VIewPage/CommentSection';
import VideoSection from '../sections/VIewPage/VideoSection';
import ActorSection from '../sections/VIewPage/ActorSection';
import { useParams } from 'react-router-dom';
// import ListVIewer from '../components/ListVIewer';
import PremiumPopup from '../components/VipPopup';
import Alert18 from '../components/Alert18';
// import axios from 'axios';

export default function ViewPage() {
  const [videoData, setVideoData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [isAdultContent, setIsAdultContent] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false); // State to manage VIP popup
  const hasMounted = useRef(false);

  const { id, stt } = useParams();

  useEffect(() => {
    if (!hasMounted.current) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/movie/isAdult?id=${id}`);
          const result = await response.text();

          if (result === 'true') {
            setIsAdultContent(true);
          } else {
            setIsAdultContent(false);
          }
        } catch (error) {
          console.error('Error fetching adult content:', error);
        }

        await fetchVideoData();
        await fetchMovieData();
      };

      const viewUp = async () => {
        try {
          await fetch(`http://127.0.0.1:8000/api/movie/viewUp?id=${id}`);
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
      };

      fetchData();
      viewUp();

      hasMounted.current = true; // Set hasMounted to true after the first mount
    }

    const checkVipStatus = async () => {
      const storedId = localStorage.getItem('movie_id');
      if (!storedId) {
        console.error('No ID found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/movie/isVip?id=${id}`);
        const isVip = await response.text();

        if (isVip === "true") {
         //console.log(" vip");
          const vipData = JSON.parse(localStorage.getItem('vip'));
          if (!vipData || new Date(vipData.expirationDate) < new Date() || vipData.status === 0) {
            setShowPremiumPopup(true); // Show the popup if VIP is not valid
          }
        } else {
          // console.log("k vip");
          // setShowPremiumPopup(true); // Show the popup if not VIP
        }
      } catch (error) {
        console.error('Error checking VIP status:', error);
      }
    };

    const timeoutId = setTimeout(checkVipStatus, 10000);

    return () => clearTimeout(timeoutId);
  }, [id, stt]);

  const fetchVideoData = async () => {
    try {
      const response = await fetch(stt ? `http://127.0.0.1:8000/api/movie/getVideo/${id}/${stt}` : `http://127.0.0.1:8000/api/movie/getVideo/${id}`);
      const jsonData = await response.json();
      localStorage.setItem('movie_id', id);
      setVideoData(jsonData);
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const fetchMovieData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/movie/view/${id}`);
      const jsonData = await response.json();
      setMovieData(jsonData);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <>
      <main className='section40 flex-row container'>
        <div className='flex gap-[30px]'>
          <div className='w-[70%] flex flex-col gap-[30px]'>
            {videoData && <VideoSection address={videoData.addressVideo} />}
            {movieData && (
              <>
                <InfoMovieSection
                  id={movieData.id}
                  name={movieData.name}
                  description={movieData.description}
                  view_count={movieData.view_count}
                  created_at={movieData.updated_at}
                  video_duration={movieData.video_duration}
                  nation={movieData.nation}
                  viewing_time={movieData.viewing_time}
                  like_count={movieData.like_count}
                  dislike_count={movieData.dislike_count}
                />
                <ActorSection actor={movieData.actors} />
                {/* <ContentViewTogether /> */}
              </>
            )}
          </div>
          {movieData && (
            <DetailMovieSection
              poster={movieData.thumbnail}
              rating={movieData.rating}
              episode={movieData.episodes}
            />
          )}
          {/* <DetailViewer /> */}
        </div>

        {movieData && <CommentSection comments={movieData.comments} movie_id={id} />}
        <ProposeSection />
        {/* <ListVIewer /> */}
      </main>
      {isAdultContent && <Alert18 />}
      {showPremiumPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <PremiumPopup />
        </div>
      )}
    </>
  );
}
