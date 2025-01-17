<?php

namespace App\Controller;

use App\Controller\ApiController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use OpenApi\Annotations as OA;

class Info extends ApiController
{
    /**
     * @Route("/info", methods={"GET"})
     * @OA\Response(
     *  response=200,
     *  description="Get informations about the API",
     * )
     */
    public function index(): Response
    {

    // check if ghostscript is found
        $has_ghostscript = false;
        if (is_executable(realpath($this->getParameter('binaries.ghostscript')))) {
            $has_ghostscript = true;
        }

        // check if ffmpeg is found
        $has_ffmpeg = false;
        if (is_executable(realpath($this->getParameter('binaries.ffmpeg')))) {
            $has_ffmpeg = true;
        }

        // check if imagick is enabled
        $has_imagick = false;
        if (extension_loaded('imagick')) {
            $has_imagick = true;
        }

        return new JsonResponse([
          'version' => $this->getParameter('version'),
          'upload' => [
            'image' => $this->getParameter('allow.upload.image') == 'true' && $has_imagick,
            'video' => $this->getParameter('allow.upload.video') == 'true' && $has_ffmpeg,
            'pdf' => $this->getParameter('allow.upload.pdf') == 'true' && $has_ghostscript,
          ],
          'default_lang' => $this->getParameter('lang'),
          'allow_email' => $this->getParameter('allow.email') == 'true',
        ], JsonResponse::HTTP_OK);
    }
}
