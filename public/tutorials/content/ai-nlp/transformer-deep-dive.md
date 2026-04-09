## Inside the Transformer Block

Every transformer layer has two sub-layers: **Multi-Head Self-Attention** and a **Position-wise Feed-Forward Network**. Each sub-layer is wrapped with a residual connection and layer normalization.

<!-- title: transformer_block.py -->
```python
import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, num_heads: int, dropout: float = 0.1):
        super().__init__()
        assert d_model % num_heads == 0
        self.d_k = d_model // num_heads
        self.num_heads = num_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        self.dropout = nn.Dropout(dropout)

    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn = self.dropout(torch.softmax(scores, dim=-1))
        return torch.matmul(attn, V), attn

    def forward(self, Q, K, V, mask=None):
        B = Q.size(0)
        Q = self.W_q(Q).view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        x, _ = self.scaled_dot_product_attention(Q, K, V, mask)
        x = x.transpose(1, 2).contiguous().view(B, -1, self.num_heads * self.d_k)
        return self.W_o(x)

class TransformerBlock(nn.Module):
    def __init__(self, d_model: int, num_heads: int, d_ff: int, dropout: float = 0.1):
        super().__init__()
        self.attention = MultiHeadAttention(d_model, num_heads, dropout)
        self.ff = nn.Sequential(
            nn.Linear(d_model, d_ff), nn.GELU(), nn.Dropout(dropout), nn.Linear(d_ff, d_model),
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        attn_out = self.attention(self.norm1(x), self.norm1(x), self.norm1(x), mask)
        x = x + self.dropout(attn_out)
        x = x + self.dropout(self.ff(self.norm2(x)))
        return x

block = TransformerBlock(d_model=512, num_heads=8, d_ff=2048)
x = torch.randn(1, 10, 512)
print(block(x).shape)  # torch.Size([1, 10, 512])
```

> **NOTE:** **RoPE (Rotary PE):** Used in LLaMA, Mistral, and most modern LLMs. Rotates key/query vectors based on position, allowing relative position encoding that generalizes better to sequences longer than seen during training.
