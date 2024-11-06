import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3001;

// Configuração do multer para salvar as imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Renomeia a imagem para evitar conflitos
    },
});

const upload = multer({ storage });

// Middleware para parsear o JSON
app.use(express.json());

// Configurar o Express para servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint para criar um prêmio
app.post('/premios', upload.single('imagem'), (req, res) => {
    const { nome, descricao } = req.body;
    const imagemPath = req.file ? `http://localhost:${port}/uploads/${req.file.filename}` : null;

    const newPremio = { id: Date.now(), nome, descricao, imagem: imagemPath };

    res.json(newPremio);
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
