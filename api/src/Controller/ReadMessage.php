<?php
namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ReadMessage extends Controller
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(Message $data): Message
    {
        $this->denyAccessUnlessGranted("ROLE_USER");

        // remove this message from the current users news
        $user = $this->getUser();
        $user->removeNews($data->getId());
        $this->em->persist($user);
        $this->em->flush();

        return $data;
    }
}