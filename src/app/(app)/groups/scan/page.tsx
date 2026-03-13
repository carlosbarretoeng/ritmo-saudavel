'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, VideoOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ScanQrCodePage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API is not supported in this browser.');
        toast({
          variant: 'destructive',
          title: 'Câmera não suportada',
          description: 'Seu navegador não suporta o acesso à câmera.',
        });
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Acesso à câmera negado',
          description: 'Por favor, habilite o acesso à câmera nas configurações do seu navegador.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
       <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold font-headline">Escanear QR Code</h1>
        </div>
      <Card>
        <CardContent className="p-4 relative">
          <div className="aspect-square w-full rounded-lg bg-black flex items-center justify-center overflow-hidden relative">
             <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
             
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2/3 h-2/3 border-4 border-dashed border-white/70 rounded-lg" />
             </div>

             {!hasCameraPermission && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
                    <VideoOff className="w-12 h-12 mb-4 text-destructive" />
                     <Alert variant="destructive">
                        <AlertTitle>Acesso à Câmera Necessário</AlertTitle>
                        <AlertDescription>
                            Por favor, permita o acesso à câmera para escanear o QR code.
                        </AlertDescription>
                    </Alert>
                </div>
             )}
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => router.back()} className="w-full" variant="outline">
        Cancelar
      </Button>
    </div>
  );
}
