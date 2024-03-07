'use client';
import {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";

async function getNewSite(): Promise<{url?: string, error?: string}> {
  try {
    const response = await fetch(`/api/random`);
    const data = await response.json();
    if (!data.url) {
      return {error: data.error || 'An unknown error occurred'};
    }
    return {url: data.url};
  } catch (error) {
    console.error('Failed to check if embedding is allowed:', error);
    return {error};
  }
}

const WebsiteEmbedder = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | undefined>();
  const [count, setCount] = useState<undefined | number>();
  //const [canEmbed, setCanEmbed] = useState<boolean | undefined>();

  const openNewWindow = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener');
    if (newWindow) {
      newWindow.opener = null;
      newWindow.focus();
    }
  };

  const goToRandomWebsite = async () => {
    setLoading(true);
    setUrl(undefined);
    //setCanEmbed(undefined);

    try {
      const site = await getNewSite();
      if (!site.url) throw new Error(site.error || 'Failed to get a random website!');

      setUrl(site.url);
      openNewWindow(site.url);

      /*const embeddable = await canEmbedSite(site.url);
      setCanEmbed(embeddable);

      if (!embeddable) openNewWindow(site.url);*/
    } catch (error) {
      console.error('Failed to go to a new website:', error);
      //setCanEmbed(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    //return <p>{canEmbed === undefined ? 'Checking if the site can be embedded...' : 'This website cannot be embedded, we opened it in another browser window for you.'}</p>;
  }

  useEffect(() => {
    fetch('/api/count').then(r => r.json()).then((r) => {
      setCount(r.count);
    })
  }, []);

  return (
    <div>
      <Button onClick={goToRandomWebsite}>{`FUMBLE UPON${count == null ? '' : (' ' + count + ' Dapps')  }`}</Button>
      {
        //canEmbed && url && <iframe src={url} width="100%" height="500px" style={{ border: 'none' }} title="Embedded Site"></iframe>
      }
    </div>
  );
};
export default WebsiteEmbedder;
