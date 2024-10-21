import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface FontInfo {
  family: string;
  variants: string;
  letterSpacings: string;
  fontWeight: string;
  url: string;
}

interface ButtonStyle {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  textTransform: string;
  textDecoration: string;
  textAlign: string;
  backgroundColor: string;
  color: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
}

interface ShopifyStyles {
  fonts: FontInfo[];
  primaryButton: ButtonStyle | null;
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const styles = await fetchShopifyStyles(url);
    res.json(styles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to scrape the URL.' });
  }
});

async function fetchShopifyStyles(url: string): Promise<ShopifyStyles> {
  const response = await axios.get(url);
  const html = response.data;
  console.log(url);
  const $ = cheerio.load(html);

  const fonts: FontInfo[] = [];
  $('link[rel="stylesheet"]').each((_, elem) => {
    const href = $(elem).attr('href');
    if (href && href.includes('fonts.googleapis.com')) {
      const match = href.match(/family=([^&:]+)/);
      const fontFamily = match ? decodeURIComponent(match[1]).split(':')[0] : 'unknown';
      const variants = href.includes('wght') ? '400' : 'unknown';
      fonts.push({
        family: fontFamily,
        variants: variants,
        letterSpacings: '0.01em',
        fontWeight: '400',
        url: href,
      });
    }
  });

  let primaryButton: ButtonStyle | null = null;
  const button = $('form[action*="/cart/add"] button').first();
  if (button) {
    const buttonStyles = {
      fontFamily: button.css('font-family') || 'Helvetica',
      fontSize: button.css('font-size') || '16px',
      lineHeight: button.css('line-height') || '1.5',
      letterSpacing: button.css('letter-spacing') || '0.01em',
      textTransform: button.css('text-transform') || 'uppercase',
      textDecoration: button.css('text-decoration') || 'underline',
      textAlign: button.css('text-align') || 'left',
      backgroundColor: button.css('background-color') || '#000',
      color: button.css('color') || '#fff',
      borderColor: button.css('border-color') || '#000',
      borderWidth: button.css('border-width') || '1px',
      borderRadius: button.css('border-radius') || '4px',
    };
    primaryButton = buttonStyles;
  }

  return { fonts, primaryButton };
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
