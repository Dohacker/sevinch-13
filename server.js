import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import TelegramBot from "node-telegram-bot-api";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-me";
const MEDIA_FILE = path.join(__dirname, "data", "media.json");
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");

app.use(express.json({limit:"2mb"}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(UPLOAD_DIR));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${path.extname(file.originalname)}`)
});
const upload = multer({
  storage,
  limits:{fileSize:80*1024*1024},
  fileFilter:(_, file, cb) => {
    if(file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) cb(null,true);
    else cb(new Error("Faqat rasm yoki video yuklash mumkin."));
  }
});

function readMedia(){
  try { return JSON.parse(fs.readFileSync(MEDIA_FILE,"utf8")); }
  catch { return []; }
}
function writeMedia(items){
  fs.writeFileSync(MEDIA_FILE, JSON.stringify(items,null,2));
}
function isAdmin(req){
  return req.headers["x-admin-password"] === ADMIN_PASSWORD;
}

app.get("/api/media", (_,res)=>res.json(readMedia()));

app.post("/api/upload", upload.single("media"), (req,res)=>{
  if(!isAdmin(req)) return res.status(401).json({error:"Ruxsat yo'q"});
  if(!req.file) return res.status(400).json({error:"Fayl topilmadi"});
  const item = {
    id: crypto.randomUUID(),
    type: req.file.mimetype.startsWith("video/") ? "video" : "image",
    src: `/uploads/${req.file.filename}`,
    caption: (req.body.caption || "").slice(0,180),
    createdAt: new Date().toISOString()
  };
  const items = readMedia();
  items.unshift(item);
  writeMedia(items);
  res.json(item);
});

app.delete("/api/media/:id",(req,res)=>{
  if(!isAdmin(req)) return res.status(401).json({error:"Ruxsat yo'q"});
  const items = readMedia();
  const item = items.find(x=>x.id===req.params.id);
  if(!item) return res.status(404).json({error:"Topilmadi"});
  if(item.src.startsWith("/uploads/")){
    const file = path.join(__dirname,"public",item.src);
    if(fs.existsSync(file)) fs.unlinkSync(file);
  }
  writeMedia(items.filter(x=>x.id!==req.params.id));
  res.json({ok:true});
});

app.get("/health",(_,res)=>res.json({ok:true}));

const token = process.env.TELEGRAM_BOT_TOKEN;
if(token){
  const bot = new TelegramBot(token,{polling:true});
  bot.onText(/\/start/, msg=>{
    bot.sendMessage(msg.chat.id,
`🎁 Sevinch uchun sovg'a boshqaruvchisi

Admin bo'lsangiz rasm yoki video yuboring.
Caption yozsangiz, u galereya ostida chiqadi.`);
  });

  bot.on("photo", async msg=>{
    if(String(msg.from.id)!==String(process.env.TELEGRAM_ADMIN_ID)) return;
    const photo = msg.photo.at(-1);
    const link = await bot.getFileLink(photo.file_id);
    const response = await fetch(link);
    const buf = Buffer.from(await response.arrayBuffer());
    const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.jpg`;
    fs.writeFileSync(path.join(UPLOAD_DIR,name),buf);
    const items = readMedia();
    items.unshift({id:crypto.randomUUID(),type:"image",src:`/uploads/${name}`,caption:msg.caption||"",createdAt:new Date().toISOString()});
    writeMedia(items);
    bot.sendMessage(msg.chat.id,"✅ Rasm sovg'a saytiga qo'shildi.");
  });

  bot.on("video", async msg=>{
    if(String(msg.from.id)!==String(process.env.TELEGRAM_ADMIN_ID)) return;
    const link = await bot.getFileLink(msg.video.file_id);
    const response = await fetch(link);
    const buf = Buffer.from(await response.arrayBuffer());
    const ext = path.extname(msg.video.file_name || "") || ".mp4";
    const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
    fs.writeFileSync(path.join(UPLOAD_DIR,name),buf);
    const items = readMedia();
    items.unshift({id:crypto.randomUUID(),type:"video",src:`/uploads/${name}`,caption:msg.caption||"",createdAt:new Date().toISOString()});
    writeMedia(items);
    bot.sendMessage(msg.chat.id,"🎬 Video sovg'a saytiga qo'shildi.");
  });
  console.log("Telegram bot ishga tushdi");
}

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));